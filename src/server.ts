import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes (public)
app.use("/api/auth", authRoutes);

// Expense Routes (protected via middleware in expenseRoutes)
app.use("/api/expenses", expenseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Expense Tracker API Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
