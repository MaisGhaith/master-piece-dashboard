const router = require("express").Router();
const pool = require('../db');

router.put("/editService/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { title, image } = req.body;

        const sql = `UPDATE services SET title = $1, image = $2 WHERE id = $3`;
        const editValues = [title, image, id];
        const updateService = await pool.query(sql, editValues);

        res.json(updateService.rows);
    } catch (error) {
        res.status(500).json({ error: "can't edit data" })
    }
});

module.exports = router;