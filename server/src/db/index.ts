import * as schema from './schema'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from '../env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true })
