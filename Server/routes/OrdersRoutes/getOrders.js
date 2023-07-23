const router = require("express").Router();
const pool = require('../../db');

// ! get pending orders, need to approve
router.get('/getPending', async (req, res) => {
    try {
        const allPending = await pool.query("SELECT * FROM orders WHERE approved = false");
        res.json(allPending.rows);
    } catch (error) {
        res.status(500).json({ error: "Server error, can't get pending orders data from db" })
    }
})


// ! get in progress orders
router.get("/getOrders", async (req, res) => {
    // const { id } = req.query; // Use query instead of params
    try {
        const allOrders = await pool.query("SELECT * FROM orders WHERE status = false  AND approved = true");
        res.json(allOrders.rows);
    } catch (error) {
        res.status(500).json({ error: "Server error, can't get orders data from db" });
    }
});



// ! get done orders
router.get("/getDoneOrders", async (req, res) => {
    try {
        const allDone = await pool.query("SELECT * FROM orders WHERE status = true");
        res.json(allDone.rows);
    } catch (error) {
        res.status(500, error, "Server error, can't get orders data from db")
    }
})


module.exports = router;