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
        res.status(500, error, "Server error, can't get choices data from db")
    }
})


router.get("/getDetails/:choice_id", async (req, res) => {
    const { choice_id } = req.params;
    const sql = `SELECT * FROM details WHERE deleted = false AND choice_id = $1`

    try {
        const allDetails = await pool.query(sql, [choice_id]);
        res.json(allDetails.rows);
        console.log(allDetails.rows)

    } catch (error) {
        res.status(500, error, "Server error, can't get details data from db")

    }
})

module.exports = router;