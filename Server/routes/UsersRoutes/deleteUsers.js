const router = require("express").Router();
const pool = require('../../db');

router.put('/deleteUser/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const user = await pool.query('SELECT deleted FROM users WHERE user_id = $1', [user_id]);
        const deletedValue = !user.rows[0].deleted; // Toggle the value of `deleted`

        const updateSql = 'UPDATE users SET deleted = $1 WHERE user_id = $2';
        const updateValues = [deletedValue, user_id];

        await pool.query(updateSql, updateValues);

        res.json('User status has been updated');
    } catch (error) {
        console.error(error);
        res.status(500).json('An error occurred while updating the user status');
    }
});

module.exports = router;