import express from "express";
import { createServer } from "node:http";
// import { server } from "socket.io";
import { conectToSocket } from "./controllers/socketManeger.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";

dotenv.config({ path: "../.env" });
const app = express();
const server = createServer(app);
const io = conectToSocket(server);

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.mongo_url;
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/vi/users", userRoute);

app.get("/home", (req, res) => {
  res.send("hellp");
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
