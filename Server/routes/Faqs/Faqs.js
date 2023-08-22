const router = require("express").Router();
const pool = require('../../db');

router.get("/faqs-get", async (req, res) => {

    const sql = `SELECT * FROM faqs`;
    try {
        const allQuestions = await pool.query(sql);
        res.json(allQuestions.rows);

    } catch (error) {
        res.status(500).json(error, "server error, can't get the Question")
    }

})


router.put("/answer-faq/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const { answer } = req.body;

        const sql = `UPDATE faqs SET answer = $1 WHERE id = $2`;
        const editedValue = [answer, id];
        const updatedAnswer = await pool.query(sql, editedValue);
        res.json(updatedAnswer.rows);

    } catch (error) {

        res.status(500).json({ error: "can't edit the service" });

    }

})



router.put("/display/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // الحصول على السجل الحالي من قاعدة البيانات
        const getCurrentStatus = await pool.query('SELECT display FROM faqs WHERE id = $1', [id]);
        const currentDisplayStatus = getCurrentStatus.rows[0].display;

        // تبديل القيمة بين true و false
        const newDisplayStatus = !currentDisplayStatus;

        // تحديث القيمة في قاعدة البيانات
        const sql = 'UPDATE faqs SET display = $2 WHERE id = $1';
        await pool.query(sql, [id, newDisplayStatus]);

        res.json({ success: true, newDisplayStatus });
    } catch (error) {
        res.status(500).json({ error: "can't change display status" });
    }
});

module.exports = router;
