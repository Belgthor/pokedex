import 'dotenv/config';

interface AuthConfig {
  secret: string;
  refresh: string;
}

const authConfig: AuthConfig = {
  secret: process.env.JWT_SECRET || 'my-secret-key',
  refresh: process.env.JWT_REFRESH || 'my-refresh-key'
};

export default authConfig;