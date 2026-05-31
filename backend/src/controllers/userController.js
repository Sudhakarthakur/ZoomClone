import {
  User
} from "../models/user.model.js";
import { Meeting } from "../models/meeting.model.js";
import bcrypt, {
  hash
} from "bcrypt";
import crypto from "crypto";
import httpStatus from "http-status";

const login = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "User does not exits"
    });
  }

  try {
    const user = await User.findOne({
      username
    });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: "user not found"
        });
    }
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({
        token: token,
        name: user.name,
        username: user.username,
        userId: user._id
      });
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({
          message: "Invalid Username or password"
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: `Something is wrong ${e}`
    });
  }
};

const register = async (req, res) => {
  const {
    name,
    username,
    password
  } = req.body;

  try {
    const exitingUser = await User.findOne({
      username
    });
    if (exitingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({
          message: "User already register"
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashPassword,
    });

    await newUser.save();
    res.status(httpStatus.CREATED).json({
      message: "new User registerd"
    });
  } catch (error) {
    res.json({
      message: `something is wromg ${e}`
    });
  }
};



const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token: token });
    const meeting = await Meeting.find({ user_id: user.username })
    res.json(meeting)
  } catch (e) {
    res.json({ message: `Somethig Went Wrong  ${e}` })
  }
}


const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token: token });

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code
    })

    await newMeeting.save();
    res.status(httpStatus.CREATED).json({ message: "Added to code History" })
  } catch (e) {
    res.json({ message: `Something Went Wrong ${e}` })
  }

}

export {
  login,
  register, addToHistory, getUserHistory
};