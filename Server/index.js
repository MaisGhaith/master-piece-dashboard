const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8181;

//* middleware //
app.use(express.json({ limit: '50mb' }));

// app.use(express.json())  // access data from client side   // req.body
app.use(cors()) // to make our backend interact with frontend

// * Routes //
// ! services Routes
app.use("/dash", require('./routes/ServicesRoutes/addService'))
app.use("/services", require('./routes/ServicesRoutes/getServices'))
app.use("/edit", require('./routes/ServicesRoutes/editService'))
app.use("/delete", require('./routes/ServicesRoutes/deleteService'))

// ! Choices routes
app.use("/getChoices", require('./routes/ChoicesRoutes/getChoice'))
app.use("/addChoices", require('./routes/ChoicesRoutes/addChoice'))
app.use("/editChoices", require('./routes/ChoicesRoutes/editChoice'))
app.use("/deleteChoices", require('./routes/ChoicesRoutes/deleteChoice'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;