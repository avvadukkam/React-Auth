import config from '../config.js';

const db = config.db;

export const createUser = async (fullName, email, password) => {
    const [result] = await db.execute('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)', [fullName, email, password]);
    return result.insertId;
};

export const getUserByEmail = async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};