// routes/budget.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Budget = require('../models/Budget');
const mongoose = require('mongoose');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

router.get('/:id/expenses',authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  try {
    const budgets = await Budget.findOne({ _id: id });
  console.log(budgets)

    if (!budgets) {
      return res.status(200).json({ expenses: [] });
    }
    const { available, remaining ,totalExpenses} = calculateAmounts(budgets);
    
    
    const data={
      available,
        remaining,
        used:totalExpenses,
        budgets,
        name:budgets.name,
        total:budgets.totalAmount
    }
    console.log(data)
 
    res.status(200).json({ data:data });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new budget
router.post('/create', authMiddleware, async (req, res) => {
  const { name, totalAmount } = req.body;

  try {
    const newBudget = new Budget({
      name,
      totalAmount,
      user: req.user._id,
      expenses: [],
    });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Enter an expense for a budget
router.post('/:id/expenses', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  try {
    const budget = await Budget.findOne({ _id: id, user: req.user._id });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    budget.expenses.push({ name, amount });
    await budget.save();
    
    res.status(200).json(budget);
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
});



// Calculate available and remaining amounts for a budget
function calculateAmounts(budget) {
  const totalExpenses = budget.expenses.reduce((total, expense) => total + expense.amount, 0);
  const available = budget.totalAmount - totalExpenses;
  const remaining = budget.totalAmount - available;
  return { available, remaining,totalExpenses };
}
router.get('/', authMiddleware, async (req, res) => {
    try {
      const budgets = await Budget.find({ user: req.user._id });
      const budgetsWithAmounts = budgets.map(budget => {
        const { available, remaining } = calculateAmounts(budget);
        const used = budget.totalAmount - available;
        return {
          _id: budget._id,
          name: budget.name,
          totalAmount: budget.totalAmount,
          available,
          remaining,
          used,
          user:budget.user
        };
      });
      res.status(200).json(budgetsWithAmounts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
