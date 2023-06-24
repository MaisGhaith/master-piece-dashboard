const router = require("express").Router();
const pool = require('../db');

router.get("/getService", async (req, res) => {

    const sql = `SELECT * FROM services`;
    try {

        const allServices = await pool.query(sql);
        res.json(allServices.rows)

    } catch (error) {
        res.status(500).json(error, "server error, can't get data from db")

    }

})

module.exports = router;