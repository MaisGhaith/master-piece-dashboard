const router = require('express').Router();
const pool = require('../../db');

router.post("/addChoice/:service_id", async (req, res) => {
    try {
        //* 1 destructure the req.body  (choice, price)
        const { service_id } = req.params; // get this from services table
        const { choice, price } = req.body;
        console.log(service_id)
        console.log(price)
        //* 2 check if choice exists (if service exists then throw an error)
        const sql = "SELECT * FROM choices WHERE choice = $1";
        const choices = await pool.query(sql, [choice])
        console.log(choices)
        console.log(price, choice)
        if (choices.rows.length !== 0) {
            res.status(201).json(["This choice already exists", choices.rows])
            console.log("Mais")
        } else {

            //* 3 check if inputs are empty 
            if (!choice || !price) {
                res.status(400).json("Choice and price is a must to add")
                console.log("drobi")
            } else {
                //* 4 enter the new choice indise our db

                const newChoice = "INSERT INTO choices (choice, price, service_id) VALUES ($1, $2, $3) RETURNING * ";
                const newChoiceValues = [choice, price, service_id];

                const insertChoice = await pool.query(newChoice, newChoiceValues);
                res.status(200).send("Choice added successfully")
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error to add choice");
    }
})


router.post('/details/:choice_id', async (req, res) => {
    const { choice_id } = req.params;
    const { desc, price } = req.body;
    console.log(choice_id, desc, price)

    try {
        const query = `
            INSERT INTO details ("desc", price, choice_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [desc, price, choice_id];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});




module.exports = router;