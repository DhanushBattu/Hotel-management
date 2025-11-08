const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/sales', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const [sales] = await db.query(
      'SELECT SUM(total_amount) as total_sales, COUNT(*) as total_orders FROM orders WHERE created_at BETWEEN ? AND ?',
      [start_date || new Date().toISOString().split('T')[0], end_date || new Date().toISOString().split('T')[0]]
    );
    
    res.json(sales[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales report' });
  }
});

module.exports = router;
