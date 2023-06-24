const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8181;

//* middleware //
app.use(express.json({ limit: '50mb' }));

// app.use(express.json())  // access data from client side   // req.body
app.use(cors()) // to make our backend interact with frontend

// * Routes //
app.use("/dash", require('./routes/addService'))
app.use("/services", require('./routes/getServices'))
app.use("/edit", require('./routes/editService'))
app.use("/delete", require('./routes/deleteService'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;