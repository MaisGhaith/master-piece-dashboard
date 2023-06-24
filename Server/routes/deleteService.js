const router = require('express').Router();
const pool = require('../db');

router.put('/deleteService/:id', async (req, res) => {
    const { id } = req.params;

    const sql = "UPDATE services SET deleted = true WHERE id = $1";
    const deleteValues = [id];

    try {
        await pool.query(sql, deleteValues);
        res.json('Your service has been soft deleted');
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json("An error occurred while soft deleting the service");
    }
});

module.exports = router;
