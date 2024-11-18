import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
//database connection
connectDB();
const app = express();
//middlware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>welcome to ecommerce</h1>");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgYellow.white);
});
