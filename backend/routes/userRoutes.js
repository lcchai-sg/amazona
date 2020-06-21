import express from 'express';
import User from '../models/user';
import { getToken } from '../util';

const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (signinUser) {
    delete signinUser.password;
    const uInfo = { ...signinUser._doc };
    delete uInfo.password;
    res.status(200).send({
      ...uInfo,
      token: getToken(signinUser)
    })
  } else {
    res.status(401).send({ message: 'Invalid credentials!' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    if (user) {
      res.status(401).send({ message: 'Email is already registered!' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const regUser = await newUser.save();
    if (regUser) {
      const uInfo = regUser._doc;
      delete uInfo.password;
      res.status(200).send({
        ...uInfo,
        token: getToken(uInfo),
      });
    }
  } catch (error) {
    res.status(401).send({ message: 'Registration Failed!' });
  }

});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "LC",
      email: "lcc@gmail.com",
      password: "123123",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
})

export default router;