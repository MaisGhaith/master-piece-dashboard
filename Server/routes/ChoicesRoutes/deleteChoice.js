const router = require("express").Router();
const pool = require('../../db');
const { route } = require("./addChoice");

router.put('/deleteChoice/:id', async (req, res) => {

    const { id } = req.params;
    const sql = "UPDATE choices SET deleted = true WHERE id = $1";
    const deleteValues = [id];

    try {
        await pool.query(sql, deleteValues);
        res.status(200).json('Your Choice has been soft deleted')
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json("An error occurred while soft deleting the choice");
    }
})


router.put('/deleteDetails/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE details SET deleted = true WHERE id = $1`

    try {
        await pool.query(sql, [id]);
        res.status(200).json('choice detail has been deleted successfully')
    } catch (error) {
        res.status(500).json("An error occurred while soft deleting the details");

    }
})

module.exports = router;