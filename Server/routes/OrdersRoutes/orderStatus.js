const router = require("express").Router();
const pool = require('../../db');

router.put('/changeStatus/:order_no', async (req, res) => {
    const { order_no } = req.params;
    console.log(req.params)

    try {
        const order = await pool.query('SELECT status FROM orders WHERE order_no = $1', [order_no]);
        const changeStatus = !order.rows[0].status; // Toggle the value of `status`

        const updateSql = 'UPDATE orders SET status = $1 WHERE order_no = $2';
        const updateValues = [changeStatus, order_no];

        await pool.query(updateSql, updateValues);

        res.json('Order status has been updated');
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred while updating the order status');
    }
});

module.exports = router;
