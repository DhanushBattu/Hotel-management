const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email, role, is_active FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { role, pin } = req.body;
    const [users] = await db.query('SELECT * FROM users WHERE role = ? AND pin = ? AND is_active = TRUE', [role, pin]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    delete user.pin; // Don't send PIN back
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
