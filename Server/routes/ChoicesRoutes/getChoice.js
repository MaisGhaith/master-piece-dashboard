const router = require("express").Router();
const pool = require('../../db');

router.get("/getChoice/:service_id", async (req, res) => {
    const { service_id } = req.params;
    const sql = `SELECT * FROM choices WHERE service_id = $1 AND deleted = false`;

    try {
        const allChoices = await pool.query(sql, [service_id]);
        res.json(allChoices.rows);
        console.log(allChoices.rows)
    } catch (error) {
        res.status(500).json(error, "Server error, can't get choices data from db")
    }
})

module.exports = router;