import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
// require('dotenv').config();  // Load environment variables

// Use process.env to access the database URL
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

export const db = drizzle(sql, { schema });

// Example query usage:
// const result = await db.select().from(schema.YourTableName);
