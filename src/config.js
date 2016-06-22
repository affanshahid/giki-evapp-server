export default {
  port: process.env.PORT || 8001,
  env: process.env.NODE_ENV || 'development',
  db_url: process.env.DATABASE_URL
};
