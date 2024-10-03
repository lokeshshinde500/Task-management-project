import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  MY_EMAIL: process.env.MY_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
