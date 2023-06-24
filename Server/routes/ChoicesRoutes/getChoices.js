const router = require("express").Router();
const pool = require('../../db');

router.get("/choices", async (req, res) => {
    const sql = `SELECT * FROM choices`;

    try {
        const allChoices = await pool.query(sql);
        res.json(allChoices.rows);
        console.log(allChoices.rows[0])
    } catch (error) {
        res.status(500).json(error, "Server error, can't get choices data from db")
    }
})

module.exports = router;