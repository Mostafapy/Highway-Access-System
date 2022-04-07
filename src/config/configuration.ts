export default () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  appName: process.env.APP_NAME,
  mysqlDatabase: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' ? true : false,
    logging: process.env.TYPEORM_LOGGING,
    autoLoadEntities: true,
    timezone: 'Z',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  },
});
