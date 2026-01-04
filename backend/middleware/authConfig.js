require('dotenv').config();

export const authConfig = {
  secret: process.env.JWT_SECRET || "my-secret-key",
  refresh: process.env.JWT_REFRESH || "my-refresh-key"
};