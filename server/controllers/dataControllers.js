const Data = require('../models/Data');

// GET /api/data - Fetch data filtered by user’s country
const getData = async (req, res) => {
    try {
        const data = await Data.find({ country: req.user.country });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
};

// GET /api/data/all - Fetch all data for admin
const getAllData = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
};

// POST /api/data - Create new data tagged with user’s country
const createData = async (req, res) => {
    const { name, age } = req.body;

    try {
        const newData = new Data({
            name,
            age,
            country: req.user.country,
        });

        await newData.save();
        res.status(201).json({ message: 'Data created successfully', data: newData });
    } catch (error) {
        res.status(500).json({ error: 'Error creating data',error });
    }
};

// PUT /api/data/:id - Update data ensuring it’s tagged with the correct country
const updateData = async (req, res) => {
    const { name, age } = req.body;

    try {
        const id = String(req.params.id);
        const data = await Data.findById(id);

        if (!data) {
            return res.status(404).json({ error: 'Data not found or unauthorized' });
        }

        data.name = name || data.name;
        data.age = age || data.age;
        await data.save();

        res.status(200).json({ message: 'Data updated successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Error updating data', error });
    }
};

// DELETE /api/data/:id - Delete data, ensuring only records matching user’s country
const deleteData = async (req, res) => {

    try {
        const id = String(req.params.id);
        const data = await Data.findOneAndDelete({ _id: id });

        if (!data) {
            return res.status(404).json({ error: 'Data not found or unauthorized' });
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting data' });
    }
};

module.exports = {
    getData,
    createData,
    updateData,
    deleteData, 
    getAllData
};
