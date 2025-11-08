const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/tickets', async (req, res) => {
  try {
    const { station } = req.query;
    
    let query = `
      SELECT kt.*, o.order_number, o.table_id, o.token_number 
      FROM kds_tickets kt
      LEFT JOIN orders o ON kt.order_id = o.id
      WHERE kt.status != 'bumped'
    `;
    const params = [];

    if (station) {
      query += ' AND kt.station = ?';
      params.push(station);
    }

    query += ' ORDER BY kt.created_at ASC';

    const [tickets] = await db.query(query, params);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch KDS tickets' });
  }
});

module.exports = router;
