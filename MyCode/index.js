import config from "config";
import mongoose from "mongoose";
import usersRoute from "./routes/user.route";
import express from "express";
import process from "process";

const app = express();

// write test here
if (!config.get("AVENAGRATIS_SECRET_KEY")) {
 console.error("FATAL ERROR: SECRET KEY NOT DEFINED");
  process.exit(1);
}

mongoose
.connect("mongodb://localhost/modejsauth", {useNewUrlParser: true})
.then(() => console.log("connected to mongodb ..."))
.catch(err => console.error("Could not connect to Mongo. ", err));

app.use(express.json());

app.use("/api/users", usersRoute);

const port = process.env.PORT || config.get("PORT") || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));