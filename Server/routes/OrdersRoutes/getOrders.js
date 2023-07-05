const router = require("express").Router();
const pool = require('../../db');
router.get("/getOrders", async (req, res) => {
    // const { id } = req.query; // Use query instead of params
    try {
        const allOrders = await pool.query("SELECT * FROM orders WHERE status = false");
        res.json(allOrders.rows);
    } catch (error) {
        res.status(500).json({ error: "Server error, can't get orders data from db" });
    }
});



router.get("/getDoneOrders", async (req, res) => {
    try {
        const allDone = await pool.query("SELECT * FROM orders WHERE status = true");
        res.json(allDone.rows);
    } catch (error) {
        res.status(500, error, "Server error, can't get orders data from db")
    }
})


module.exports = router;