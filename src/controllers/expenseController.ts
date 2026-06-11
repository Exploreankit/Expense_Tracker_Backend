import { Response } from "express";
import Expense from "../models/Expense";
import { AuthRequest } from "../middleware/authMiddleware";

export const getExpenses = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

export const createExpense = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense" });
  }
};

export const deleteExpense = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};

export const updateExpense = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { _id, ...updateData } = req.body;

    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};
