// Packages
require('dotenv').config()
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

// Project
import { Blogger } from '../models/blogger';

const router = express.Router()
const JWT_SECRET = process.env.JWT_KEY as string;


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    res.status(400).send({ message: "Username is required."});
    return
  }

  if (!password) {
    res.status(400).send({ message: "Password is required."});
    return
  }

  if (!email) {
    res.status(400).send({ message: "Email is required."});
    return
  }

  try {
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = await Blogger.create({ username, password: passwordHash, email});
    const serializedUser = newUser.toJSON()

    const accessToken = jwt.sign(
      { 
        id: serializedUser.id,
        username: serializedUser.username,
        exp: Math.floor(Date.now() / 1000) + (15 * 60)
      }, 
      JWT_SECRET
    );
    const refreshToken = jwt.sign(
      { 
        id: serializedUser.id,
        username: serializedUser.username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      }, 
      JWT_SECRET
    );

    res.send({ refreshToken, accessToken });
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).send({ message: "Username is required."});
    return
  }

  if (!password) {
    res.status(400).send({ message: "Password is required."});
    return
  }

  try {
    const user = await Blogger.findOne({ where: { username } });

    if (!user) {
      res.status(404).send({ message: "User not found." });
      return
    }

    const serializedUser = user.toJSON()

    const validPassword = await bcrypt.compare(password, serializedUser.password)

    if (!validPassword) {
      res.status(400).send({ message: "Invalid password." });
      return
    }

    const accessToken = jwt.sign(
      { 
        id: serializedUser.id,
        username: serializedUser.username,
        exp: Math.floor(Date.now() / 1000) + (15 * 60)
      }, 
      JWT_SECRET
    );
    const refreshToken = jwt.sign(
      { 
        id: serializedUser.id,
        username: serializedUser.username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      }, 
      JWT_SECRET
    );

    res.send({ refreshToken, accessToken });
    return
  } catch (err) {
    res.status(500).send({ message: err });
    return
  }
});

router.post('/refresh', async (req, res) => {
  const token = req.header('refreshToken');

  if (!token) {
    res.status(400).send({ message: "Refresh token not provided. "});
    return
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
    if (err) {
      res.status(400).send({ message: "Invalid or expired token. "});
      return
    }

    const userID = decoded.id

    const user = await Blogger.findByPk(userID);

    if (!user) {
      res.status(404).send({ message: "User not found." });
      return
    }

    const serializedUser = user.toJSON()

    const accessToken = jwt.sign(
      { 
        id: userID,
        username: serializedUser.username,
        exp: Math.floor(Date.now() / 1000) + (15 * 60)
      }, 
      JWT_SECRET
    );
    const refreshToken = jwt.sign(
      { 
        id: userID,
        username: serializedUser.username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
      }, 
      JWT_SECRET
    );

    res.send({ refreshToken, accessToken });
    return
  })
});

export default router;