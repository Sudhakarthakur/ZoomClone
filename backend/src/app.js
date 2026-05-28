import express from "express";
import {
  createServer
} from "node:http";
import path from "path";
import {
  fileURLToPath
} from "url";
// import {
//   server
// } from "socket.io";

import {
  Server
} from "socket.io";
import {
  conectToSocket
} from "./controllers/socketManeger.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";

const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

// this is connected to express instance to socket.io instance using
// createServer
const app = express();
const server = createServer(app);
const io = conectToSocket(server);

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.mongo_url;


app.use(cors());
app.use(express.json({
  limit: "40kb"
}));
app.use(express.urlencoded({
  limit: "40kb",
  extended: true
}));

app.use("/api/v1/users", userRoute);

app.get("/home", (req, res) => {
  res.send("help");
});

const start = async () => {
  await mongoose.connect(MONGO_URL);
  console.log("mongo connected");
  server.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

start();

// dbNAme=kumarsudhakar0815_db_user
// password=zoomclone

// import express from "express";
// import {
//   createServer
// } from "http";
// import path from "path";
// import {
//   fileURLToPath
// } from "url";
// import {
//   conectToSocket
// } from "./controllers/socketManeger.js";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import userRoute from "./routes/user.routes.js";

// const __filename = fileURLToPath(
//   import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({
//   path: path.resolve(__dirname, "../.env"),
// });

// const app = express();
// const server = createServer(app);
// const io = conectToSocket(server);

// const PORT = process.env.PORT || 8000;
// const MONGO_URL = process.env.mongo_url;

// app.use(cors());

// app.use(
//   express.json({
//     limit: "40kb",
//   })
// );

// app.use(
//   express.urlencoded({
//     limit: "40kb",
//     extended: true,
//   })
// );

// app.use("/api/v1/users", userRoute);

// app.get("/home", (req, res) => {
//   res.send("hello");
// });

// const start = async () => {
//   try {
//     await mongoose.connect(MONGO_URL, {
//       dbName: "kumarsudhakar0815_db_user",
//     });

//     console.log("MongoDB Connected");

//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log("MongoDB Connection Error:");
//     console.log(error.message);
//   }
// };

// start();