const router = require('express').Router();
const pool = require('../../db');
const { route } = require('./addChoice');

router.put("/editChoice/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { choice, price } = req.body;

        const sql = `UPDATE choices SET choice = $1, price = $2 WHERE id = $3`;
        const editValues = [choice, price, id];
        const updateChoice = await pool.query(sql, editValues);

        res.status(200).json(updateChoice.rows);

    } catch (error) {
        res.status(500).json({ error: "can't edit choice" })

    }
})


router.put('/editDetail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { desc, price } = req.body;

        const sql = `UPDATE details SET "desc" = $1, price = $2 WHERE id = $3`;
        const editValues = [desc, price, id];
        const updateDetails = await pool.query(sql, editValues);
        res.status(200).json(updateDetails.rows)

    } catch (error) {
        res.status(500).json({ error: "can't edit details" })

    }
})

module.exports = router;