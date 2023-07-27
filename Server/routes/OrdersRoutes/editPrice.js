const router = require("express").Router();
const pool = require('../../db');

router.put("/editPrice/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;
        console.log(id)

        const sql = `UPDATE orders SET price = $1 WHERE id = $2`;
        const editValues = [price, id];
        const updatePrice = await pool.query(sql, editValues);

        res.json(updatePrice.rows);
    } catch (error) {
        res.status(500).json({ error: "can't edit price" })
    }
})

module.exports = router;
