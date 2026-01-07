import { User } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import httpStatus from "http-status";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "User does not exits" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "user not found" });
    }
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Username or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Something is wrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const exitingUser = await User.findOne({ username });
    if (exitingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already register" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashPassword,
    });

    await newUser.save();
    res.status(httpStatus.CREATED).json({ message: "new User registerd" });
  } catch (error) {
    res.json({ message: `something is wromg ${e}` });
  }
};

export { login, register };
