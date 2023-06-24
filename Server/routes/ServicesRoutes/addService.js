const router = require("express").Router();
const pool = require('../../db');

router.post("/addService", async (req, res) => {
    try {
        //* 1 destructure the req.body  (title, image)
        const { title, image } = req.body;
        console.log(image, title)
        console.log(req.body)

        //* 2 check if service exists (if service exists then throw an error)
        console.log("mais")
        const service = await pool.query("SELECT * FROM services WHERE title = $1", [title]);
        // console.log(service)

        if (service.rows.length !== 0) {
            res.status(201).json(["This service already exists", service.rows]);
        } else {
            //* 3 check if inputs are empty
            if (!title || !image) {
                res.status(400).json("Title and image are required");
            } else {
                //* 4 enter the new service inside our db
                const newService = "INSERT INTO services (title, image) VALUES($1, $2) RETURNING * ";
                const newServiceValues = [title, image];

                const insertService = await pool.query(newService, newServiceValues);
                res.status(200).send("Service added successfully");
                // console.log(insertService)
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error to add service");
    }
});

module.exports = router;
