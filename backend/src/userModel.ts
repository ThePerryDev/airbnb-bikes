/* userModel.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'Perry Devs',
  host: '127.0.0.1',
  database: 'bdbikepass',
  port: 3100,
});

export interface IUser {
  id?: string;
  googleId?: string;
  email?: string;
  name?: string;
  photo?: string;
}

export async function createUser(user: IUser): Promise<IUser> {
  const { googleId, email, name, photo } = user;
  const result = await pool.query(
    'INSERT INTO users (google_id, email, name, photo) VALUES ($1, $2, $3, $4) RETURNING *',
    [googleId, email, name, photo]
  );
  return result.rows[0];
}

export async function getUserByGoogleId(googleId: string): Promise<IUser | null> {
  const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
  return result.rows[0] || null;
}
*/