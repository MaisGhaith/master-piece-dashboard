const router = require("express").Router();
const pool = require('../../db');

router.get("/getUsers", async (req, res) => {

    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows)
    } catch (error) {
        res.status(500).json(error, "Server error, can't get users data from db")
    }

})

router.get("/activeUsers", async (req, res) => {
    try {
        const activeUsers = await pool.query("SELECT * FROM users WHERE deleted = false ");
        res.json(activeUsers.rows);
    } catch (error) {
        res.status(500).json(error, "Server error, can't get active users data from db")

    }
})

router.get("/deletedUsers", async (req, res) => {
    try {
        const activeUsers = await pool.query("SELECT * FROM users WHERE deleted = true ");
        res.json(activeUsers.rows);
    } catch (error) {
        res.status(500).json(error, "Server error, can't get active users data from db")

    }
})

module.exports = router;