// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataControllers = require('../controllers/dataControllers');
const authMiddleware = require('../middlewares/authMiddlewares');

// GET /api/data - Fetch data by country
router.get('/', authMiddleware, dataControllers.getData);

// GET /api/data/all - Fetch all data for admin
router.get('/all', authMiddleware, dataControllers.getAllData);

// POST /api/data - Create new data
router.post('/', authMiddleware, dataControllers.createData);

// PUT /api/data/:id - Update data
router.put('/:id', authMiddleware, dataControllers.updateData);

// DELETE /api/data/:id - Delete data
router.delete('/:id', authMiddleware, dataControllers.deleteData);

module.exports = router;
