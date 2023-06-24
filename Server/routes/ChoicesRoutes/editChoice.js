const router = require('express').Router();
const pool = require('../../db');

router.put("/editChoice/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { choice, price } = req.body;

        const sql = `UPDATE choices SET choice = $1, price = $2 WHERE id = $3`;
        const editValues = [choice, price, id];
        const updateChoice = await pool.query(sql, editValues);

        res.json(updateChoice.rows);

    } catch (error) {
        res.status(500).json({ error: "can't edit choice" })

    }
})

module.exports = router;