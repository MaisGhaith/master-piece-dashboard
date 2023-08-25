const router = require("express").Router();
const pool = require('../../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Don't forget to import jwt and define SECRETKEY
const SECRETKEY = "a24f41837ef05ad9e52a3794dab8c0055cc7baf383db5d19534454768751a344";
// console.log(SECRETKEY)

router.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body;
    const sql = 'SELECT * FROM users WHERE user_email = $1';

    try {
        const allData = await pool.query(sql, [user_email]);
        const user = allData.rows[0]
        console.log(user)
        if (!user) {
            return res.status(404).json("User not found");
        } else if (user.role !== "admin" && user.role !== "owner") {
            return res.status(403).json({ user_id: user.user_id, message: "you're not admin, please log in from the website" });
        } else if (user && user.deleted === true) {
            return res.status(403).json({ user_id: user.user_id, message: 'Your account has been deactivated by admin' });
        } else if (!(await bcrypt.compare(user_password, user.user_password))) {
            return res.status(401).json({ user_id: user.user_id, message: "Incorrect email or password" });

        } else {
            const token = jwt.sign({
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
                phone_number: user.phone_number,
                role: user.role,
                deleted: user.deleted,
            }, SECRETKEY);
            console.log(token)
            return res.status(201).json({ token: token, message: 'User login successful', user_id: user.user_id });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
    }
});

module.exports = router;
