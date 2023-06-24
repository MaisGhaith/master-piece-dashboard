const router = require('express').Router();
const pool = require('../../db');

router.post("/addChoice", async (req, res) => {
    try {
        //* 1 destructure the req.body  (choice, price)
        const { id } = req.params;
        const { choice, price } = req.body;

        //* 2 check if service exists (if service exists then throw an error)
        const sql = "SELECT * FROM choices WHERE choice = $1";
        const choices = await pool.query(sql, [choice])

        if (choices.rows.length !== 0) {
            res.status(201).json(["This choice already exists", choices.rows])
        } else {

            //* 3 check if inputs are empty 
            if (!choice || !price) {
                res.status(400).json("Choice and price is a must to add")
            } else {
                //* 4 enter the new choice indise our db
                const newChoice = "INSERT INTO choices (choice, price) VALUES($1, $2) RETURNING * ";
                const newChoiceValues = [choice, price];

                const insertChoice = await pool.query(newChoice, newChoiceValues);
                res.status(200).send("Choice added successfully")
            }
        }


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error to add choice");
    }
})

module.exports = router;