import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../Utils.js';

const userRouter = express.Router();

userRouter.put(
  '/sign-up',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).send({ message: 'Email already exists!' });
      return;
    }

    const nameArray = req.body.email.split('@');
    const firstname = nameArray[0];

    const userSignup = new User({
      firstname: firstname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    await userSignup.save();
    res.send({
      users: userSignup,
      token: generateToken(userSignup),
    });
    return;
  })
);

userRouter.post(
  '/sign-in',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );
    if (!user) {
      res.status(404).send({ message: 'Account not found!' });
      return;
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const users = await User.findOne({ email: req.body.email });
      res.send({
        users: users,
        token: generateToken(user),
      });
      return;
    } else {
      res.status(404).send({ message: 'Invalid password!' });
      return;
    }
  })
);

export default userRouter;
