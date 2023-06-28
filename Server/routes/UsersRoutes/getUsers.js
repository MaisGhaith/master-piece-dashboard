const router = require("express").Router();
const pool = require('../../db');

router.get("/getUsers", async (req, res) => {

    // const sql = ``;
    try {
        const allChoices = await pool.query("SELECT * FROM users");
        res.json(allChoices.rows)
    } catch (error) {
        res.status(500).json(error, "Server error, can't get choices data from db")
    }

})

module.exports = router;