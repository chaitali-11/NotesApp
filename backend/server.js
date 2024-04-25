import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
ConnectDB();

const app = express();

app.use(express.json()); // to accept json data

/*app.get("/api/notes", (req, res) => {
  res.json(notes);
});*/

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
