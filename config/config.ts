export default () => ({
  jwt: {
    secret: process.env.JWT_SERCRET,
  },
  database: {
    connectionString: process.env.MONGODB_URI,
  },
});
