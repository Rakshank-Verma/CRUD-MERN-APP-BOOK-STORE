import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
import bookRoutes from "./Routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors()); // option 1: Allow all origins with default of cors(*)

// app.use(
//   // option 2: Allow custom origins
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  res.send(`<h1>Hello world<h1/>`);
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database!!");
    app.listen(PORT, () => {
      console.log(`Server is listening on: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
