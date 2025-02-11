import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import * as UserModel from '../models/userModel.js';
import { OAuth2Client } from 'google-auth-library';

const jwtSecret =config.jwtSecret;
const client = new OAuth2Client(process.env.CLIENT_ID);

export const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    console.log('Recieved Data:', req.body);

    if(!fullName || !email || !password) {
        return res.status(400).json({error: 'All fields are required'})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword);

        const userId = await UserModel.createUser(fullName, email, hashedPassword);
        console.log('User ID: ', userId);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Registration Error: ', error);
        res.status(500).json({ error: 'User registration failed', details: error.message});
    }
};


export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log('Login Data:', req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required'})
    }

    try {
        const user = await UserModel.getUserByEmail(email);
        console.log('User found:', user);

        if(!user) {
            return res.status(404).json({ error: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password Valid:', isPasswordValid);

        if( !isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password'});
        }

        if(!jwtSecret) {
            console.error('JWT secret not found');
            return res.status(500).json({ error: 'Internal server error'});
        }

        const token = jwt.sign({ userId: user.id}, jwtSecret, { expiresIn: '1h'});
        console.log('JWT Token: ', token);

        res.status(200).json({ message: 'Login Successful', token});
    } catch (error) {
        console.error('Login Error: '. error);
        res.status(500).json({ error: 'Login failed', details: error.message});
    }
};

export const googleLogin = async (req, res) => {
    const { tokenId } = req.body;
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { sub, email, name } = payload;
  
      let user = await UserModel.getUserByEmail(email);
  
      if (!user) {
        user = await UserModel.createUser(name, email, null);
      }
  
      const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Google login failed', error: error.message });
    }
  };