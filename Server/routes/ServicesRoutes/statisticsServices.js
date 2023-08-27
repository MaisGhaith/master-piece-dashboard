const router = require("express").Router();
const pool = require('../../db');

router.get("/getStatistics", async (req, res) => {
    try {
        const sql = `
            SELECT 
                service_name,
                COUNT(*) AS total_orders,
                SUM(CASE WHEN o.status = true THEN 1 ELSE 0 END) AS completed_orders,
                (SUM(CASE WHEN o.status = true THEN 1 ELSE 0 END)::float / COUNT(*)) * 100 AS completion_percentage,
                SUM(o.price::numeric) AS total_money,
                service_deleted
            FROM orders o
            JOIN services s ON o.service_id = s.id
            GROUP BY service_name, service_deleted
        `;
        const result = await pool.query(sql);

        return res.json(result.rows);
    } catch (error) {
        console.error("Error retrieving statistics:", error);
        return res.status(500).json({ error: "An error occurred while fetching statistics" });
    }
});

module.exports = router;
