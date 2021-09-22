import { Request, Response } from 'express';
import Users from '../db/shemas/users';
import bcrypt from 'bcrypt';
import { mongo } from 'mongoose';
import { sendError } from '../utils/errors';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find().select({ password: 0, __v: 0 });
  res.send(users);
};

const getUsersById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const user = await Users.findById(userId).select({ password: 0, __v: 0 });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({});
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, first_name, last_name, avatar, password } = req.body;
    const hash: string = await bcrypt.hash(password, 15);
    const newUser = await Users.create({
      email,
      first_name,
      last_name,
      avatar,
      password: hash,
    });
    res.send(newUser);
  } catch (e) {
    console.error(e);
    if (e instanceof mongo.MongoError) {
      res.status(400).send({
        code: e.code,
        message: e.message,
      });
      return;
    }
    res.status(500).send(e);
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw { code: 404, message: 'User not found' };
    }
    const isOk: boolean = await bcrypt.compare(password, user.password);
    if (!isOk) {
      throw { code: 404, message: 'Invalid password' };
    }
    res.send({ token: 'cualquiercosa', expiresIn: 600 });
  } catch (e) {
    sendError(res, e);
  }
};

export { getUsers, getUsersById, createUser, login };
