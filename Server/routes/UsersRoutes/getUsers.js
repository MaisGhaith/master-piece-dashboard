const router = require("express").Router();
const pool = require('../../db');

router.get("/getUsers", async (req, res) => {

    try {
        const allUsers = await pool.query("SELECT * FROM users ORDER BY register_date DESC ");
        res.json(allUsers.rows)
    } catch (error) {
        res.status(500).json(error, "Server error, can't get users data from db")
    }

})

router.get("/activeUsers", async (req, res) => {
    try {
        const activeUsers = await pool.query("SELECT * FROM users WHERE deleted = false AND role = 'user' ORDER BY register_date DESC");
        res.json(activeUsers.rows);
    } catch (error) {
        res.status(500).json({ error: "Server error, can't get active users data from db" })

    }
})

router.get("/deletedUsers", async (req, res) => {
    try {
        const activeUsers = await pool.query("SELECT * FROM users WHERE deleted = true AND role = 'user' ORDER BY register_date DESC ");
        res.json(activeUsers.rows);
    } catch (error) {
        res.status(500).json(error, "Server error, can't get active users data from db")

    }
})

module.exports = router;