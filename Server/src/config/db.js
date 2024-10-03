import mongoose from "mongoose";
import constant from "./constant.js";
 
const db = async () => {
  await mongoose
    .connect(constant.DB_URL)
    .then(() => {
      console.log("DB connected successfully :)");
    })
    .catch((err) => {
      console.error("DB not connected!", err);
    });
};

export default db;
