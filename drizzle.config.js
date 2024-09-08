// require('dotenv').config();

/** @type { import("drizzle-kit").Config } */
const config = {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL || '',  // Fallback to empty string if not found
  },
};

// Throw an error if the environment variable is missing
if (!config.dbCredentials.url) {
  throw new Error("Database URL not provided in environment variables.");
}

export default config;
