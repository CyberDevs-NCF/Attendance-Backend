import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { RefreshToken } from './schema/refresh-token.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto) {
    const { gbox, password } = signupData;
    const existingUser = await this.UserModel.findOne({ gbox: gbox });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.UserModel.create({
      gbox: gbox,
      password: hashedPassword,
    });

    return { message: 'User Created Successfully' };
  }

  async login(logindata: LoginDto) {
    const { gbox, password } = logindata;

    const user = await this.UserModel.findOne({ gbox: gbox });

    if (!user) {
      throw new BadRequestException('No User Found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentials');
    }

    return this.generateToken(user._id);
  }

  async generateToken(userId) {
    const token = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    this.storeRefreshToken(refreshToken, userId);
    return {
      token,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.updateOne(
      {
        userId,
      },
      { set: { expiryDate, token } },
      { upsert: true },
    );
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new BadRequestException('Invalid or expired refresh token');
    }

    return this.generateToken(token.userId);
  }
}
