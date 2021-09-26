module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ORIGIN: [
    "https://dev-lft.vercel.app",
    /dev-lft-.*\.vercel\.app/,
    /(www\.)?devlft\.com/,
    /^http:\/\/localhost(:[0-9]+)?$/,
  ],
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL || 'postgresql://postgres@localhost/dev-lft',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
};
