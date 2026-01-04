require('dotenv').config();

export const authConfig = {
  secret: process.env.JWT_SECRET || "roogna-secret-key",
  refresh: process.env.JWT_REFRESH || "roogna-refresh-key"
};