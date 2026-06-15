const { loadEnvConfig } = require('@next/env');

const projectDir = process.cwd();
loadEnvConfig(projectDir);

console.log("Hash in Next.js:", process.env.ADMIN_PASSWORD_HASH);
