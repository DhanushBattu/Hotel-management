const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

// GET all menu categories
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM menu_categories WHERE is_active = TRUE ORDER BY display_order'
    );
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET all menu items
router.get('/items', async (req, res) => {
  try {
    const { category, available } = req.query;
    
    let query = `
      SELECT mi.*, mc.name as category_name 
      FROM menu_items mi
      LEFT JOIN menu_categories mc ON mi.category_id = mc.id
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      query += ' AND mi.category_id = ?';
      params.push(category);
    }

    if (available === 'true') {
      query += ' AND mi.is_available = TRUE';
    }

    query += ' ORDER BY mi.name';

    const [items] = await db.query(query, params);
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// GET single menu item with modifiers
router.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get menu item
    const [items] = await db.query(
      'SELECT mi.*, mc.name as category_name FROM menu_items mi LEFT JOIN menu_categories mc ON mi.category_id = mc.id WHERE mi.id = ?',
      [id]
    );

    if (items.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    const item = items[0];

    // Get modifiers
    const [modifiers] = await db.query(
      'SELECT * FROM modifiers WHERE menu_item_id = ?',
      [id]
    );

    // Get modifier options for each modifier
    for (let modifier of modifiers) {
      const [options] = await db.query(
        'SELECT * FROM modifier_options WHERE modifier_id = ? AND is_available = TRUE',
        [modifier.id]
      );
      modifier.options = options;
    }

    item.modifiers = modifiers;
    res.json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// POST - Add new menu item (Admin only)
router.post('/items', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      name,
      description,
      category_id,
      subcategory,
      food_type,
      image_url,
      price_dine_in,
      price_takeaway,
      price_delivery,
      gst_percent,
      preparation_time,
      kitchen_station,
      modifiers
    } = req.body;

    // Validate required fields
    if (!name || !category_id || !food_type || !price_dine_in || !kitchen_station) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, category_id, food_type, price_dine_in, kitchen_station' 
      });
    }

    const itemId = uuidv4();

    // Insert menu item
    await connection.query(
      `INSERT INTO menu_items (
        id, name, description, category_id, subcategory, food_type, 
        image_url, price_dine_in, price_takeaway, price_delivery, 
        gst_percent, preparation_time, kitchen_station, is_available
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)`,
      [
        itemId,
        name,
        description || null,
        category_id,
        subcategory || null,
        food_type,
        image_url || null,
        price_dine_in,
        price_takeaway || price_dine_in,
        price_delivery || price_dine_in,
        gst_percent || 5.0,
        preparation_time || 15,
        kitchen_station
      ]
    );

    // Insert modifiers if provided
    if (modifiers && Array.isArray(modifiers)) {
      for (const modifier of modifiers) {
        const modifierId = uuidv4();
        
        await connection.query(
          `INSERT INTO modifiers (id, menu_item_id, name, is_required, multi_select) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            modifierId,
            itemId,
            modifier.name,
            modifier.is_required || false,
            modifier.multi_select || false
          ]
        );

        // Insert modifier options
        if (modifier.options && Array.isArray(modifier.options)) {
          for (const option of modifier.options) {
            await connection.query(
              `INSERT INTO modifier_options (id, modifier_id, name, price_adjustment, is_available) 
               VALUES (?, ?, ?, ?, TRUE)`,
              [
                uuidv4(),
                modifierId,
                option.name,
                option.price_adjustment || 0
              ]
            );
          }
        }
      }
    }

    await connection.commit();

    // Fetch the created item with all details
    const [newItem] = await db.query(
      'SELECT mi.*, mc.name as category_name FROM menu_items mi LEFT JOIN menu_categories mc ON mi.category_id = mc.id WHERE mi.id = ?',
      [itemId]
    );

    res.status(201).json({
      message: 'Menu item created successfully',
      item: newItem[0]
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  } finally {
    connection.release();
  }
});

// PUT - Update menu item
router.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Build dynamic update query
    const allowedFields = [
      'name', 'description', 'category_id', 'subcategory', 'food_type',
      'image_url', 'price_dine_in', 'price_takeaway', 'price_delivery',
      'gst_percent', 'preparation_time', 'kitchen_station', 'is_available'
    ];

    const updateFields = [];
    const values = [];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        values.push(updates[field]);
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(id);

    await db.query(
      `UPDATE menu_items SET ${updateFields.join(', ')} WHERE id = ?`,
      values
    );

    const [updated] = await db.query('SELECT * FROM menu_items WHERE id = ?', [id]);
    
    res.json({
      message: 'Menu item updated successfully',
      item: updated[0]
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// DELETE - Delete menu item
router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM menu_items WHERE id = ?', [id]);

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

// PATCH - Toggle item availability (86 feature)
router.patch('/items/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_available } = req.body;

    await db.query(
      'UPDATE menu_items SET is_available = ? WHERE id = ?',
      [is_available, id]
    );

    res.json({ 
      message: `Item ${is_available ? 'marked as available' : 'marked as 86'}` 
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

module.exports = router;
