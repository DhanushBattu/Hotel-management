const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const { status, order_type } = req.query;
    
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (order_type) {
      query += ' AND order_type = ?';
      params.push(order_type);
    }

    query += ' ORDER BY created_at DESC';

    const [orders] = await db.query(query, params);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET single order with items
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    
    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = orders[0];

    // Get order items
    const [items] = await db.query(
      'SELECT oi.*, mi.name, mi.image_url FROM order_items oi LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id WHERE oi.order_id = ?',
      [id]
    );

    order.items = items;
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// POST - Create new order
router.post('/', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      table_id,
      token_number,
      order_type,
      waiter_id,
      items,
      notes
    } = req.body;

    const orderId = uuidv4();
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.unit_price * item.quantity;
    }

    const tax_amount = subtotal * 0.05;
    const service_charge = subtotal * 0.05;
    const total_amount = subtotal + tax_amount + service_charge;

    // Insert order
    await connection.query(
      `INSERT INTO orders (id, order_number, table_id, token_number, order_type, waiter_id, subtotal, tax_amount, service_charge, total_amount, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderId, orderNumber, table_id, token_number, order_type, waiter_id, subtotal, tax_amount, service_charge, total_amount, notes]
    );

    // Insert order items
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (id, order_id, menu_item_id, quantity, unit_price, total_price, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [uuidv4(), orderId, item.menu_item_id, item.quantity, item.unit_price, item.unit_price * item.quantity, item.notes]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: 'Order created successfully',
      order_id: orderId,
      order_number: orderNumber
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    connection.release();
  }
});

// PUT - Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
