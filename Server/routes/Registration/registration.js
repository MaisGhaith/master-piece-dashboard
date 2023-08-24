const router = require("express").Router();
const pool = require('../../db');
const bcrypt = require("bcrypt");

router.post("/addAdmin", async (req, res) => {

    try {
        const { user_name, user_email, user_password, phone_number, role, deleted } = req.body;
        console.log(req.body)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [user_email]);

        if (user.rows.length !== 0) {
            return res.status(409).json({ message: "User already exists", user: user.rows[0] });
        } else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const bcryptPassword = await bcrypt.hash(user_password, salt);

            const newUsersql = "INSERT INTO users (user_name, user_email, user_password, phone_number, deleted, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
            const newUserValues = [user_name, user_email, bcryptPassword, phone_number, deleted, role || 'admin'];

            const insertResult = await pool.query(newUsersql, newUserValues);

            res.status(201).json({ user_id: insertResult.rows[0].user_id })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json("error");
    }

})


router.get('/getAdmins', async (req, res) => {

    const sql = `SELECT * FROM users WHERE role = 'admin'`;
    try {

        const allAdmins = await pool.query(sql);
        res.status(200).json(allAdmins.rows)
    } catch (error) {
        res.status(500).json({ error: "server error, can't get admins from db" })

    }
})


router.put('/deleteAdmin/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const getCurrentStatusQuery = `SELECT deleted FROM users WHERE user_id = $1`;
    const updateStatusQuery = `UPDATE users SET deleted = $1 WHERE user_id = $2`;

    try {
        // Get the current status
        const currentStatusResponse = await pool.query(getCurrentStatusQuery, [user_id]);
        const currentStatus = currentStatusResponse.rows[0].deleted;

        // Toggle the status
        const updatedStatus = !currentStatus;

        // Update the status in the database
        await pool.query(updateStatusQuery, [updatedStatus, user_id]);

        res.status(200).json('admin status updated');
    } catch (error) {
        console.error(error);
        res.status(500).json(`Could not update admin status with id ${user_id}`);
    }
});


router.put('/editAdmin/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { user_name, user_email, phone_number } = req.body;

    const updateAdminQuery = `
        UPDATE users
        SET user_name = $1, user_email = $2, phone_number = $3
        WHERE user_id = $4
    `;

    try {
        await pool.query(updateAdminQuery, [user_name, user_email, phone_number, user_id]);
        res.status(200).json('admin data updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json(`Could not update admin data with id ${user_id}`);
    }
});



module.exports = router;
