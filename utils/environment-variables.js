import config from 'config';

export const NODE_ENV = config.util.getEnv('NODE_ENV') || 'development';
export const CIP_ARM_CLIENT_HOST = config.util.getEnv('CIP_ARM_CLIENT_HOST') || 'http://localhost:3000/';
export const CIP_ARM_API_HOST = config.util.getEnv('CIP_ARM_API_HOST') || 'http://localhost:9000/';
