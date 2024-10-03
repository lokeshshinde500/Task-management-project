import express from "express";
import cors from "cors";
import path from "path";
 
import indexRoutes from "./routes/indexRoutes.js";
import constant from "./config/constant.js";
import db from "./config/db.js";

const app = express();
const port = constant.PORT;

// cors policy
app.use(cors());

// parse json data / urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for static files
app.use(express.static(path.resolve("public")));

// Create Server
app.listen(port, (error) => {
  if (error) {
    console.error("Server not started!");
  } else {
    console.log(`Server is running on port ${port}.`);
    db();
  }
});

// Routing
app.use("/api/v1", indexRoutes);
