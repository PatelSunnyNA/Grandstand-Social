import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import axios from "axios";
/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
    });
    const savedUser = await newUser.save();

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: passwordHash,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );
    res.status(200).json({savedUser, response:chatEngineResponse });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// router.post("/signup", async (req, res) => {
//   try {
//     const { username, password } = req.body;

    // const chatEngineResponse = await axios.post(
    //   "https://api.chatengine.io/users/",
    //   {
    //     username: username,
    //     secret: password,
    //   },
    //   {
    //     headers: { "Private-Key": process.env.PRIVATE_KEY },
    //   }
    // );

//     res.status(200).json({ response: chatEngineResponse.data });
//   } catch (error) {
//     console.error("error", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const chatToken = password
    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": user.username,
          "User-Secret": user.password,
        },
      }
    );


    user.chatToken = password
    res.status(200).json({ response: chatEngineResponse.data,token, user});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

    // const chatEngineResponse = await axios.get(
    //   "https://api.chatengine.io/users/me",
    //   {
    //     headers: {
    //       "Project-ID": process.env.PROJECT_ID,
    //       "User-Name": username,
    //       "User-Secret": password,
    //     },
    //   }
    // );

//     res.status(200).json({ response: chatEngineResponse.data });
//   } catch (error) {
//     console.error("error", error);
//     res.status(500).json({ error: error.message });
//   }
// });

