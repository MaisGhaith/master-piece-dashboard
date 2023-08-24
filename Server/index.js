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


// ! Users routes
app.use("/getAllUsers", require('./routes/UsersRoutes/getUsers'));
app.use("/deleteUsers", require('./routes/UsersRoutes/deleteUsers'));


// ! orders routes 
app.use("/orders", require('./routes/OrdersRoutes/getOrders'));
app.use("/status", require('./routes/OrdersRoutes/orderStatus'));
app.use("/editPrice", require('./routes/OrdersRoutes/editPrice'));


// ! faqs routes
app.use("/faqs", require('./routes/Faqs/Faqs'));

// ! register
app.use('/admin', require('./routes/Registration/registration'));
app.use('/login', require('./routes/Registration/login'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app;