import { Router } from "express";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/expenseController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// All expense routes require a valid JWT
router.use(protect);

router.get("/", getExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
