const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

require("dotenv").config();
require("./Modals/db");

// ✅ Move this to the top
app.use(cors({
    origin: ["https://mern-authentication-signup-login-frontend.vercel.app"], // Frontend URL
    credentials: true
}));

// ✅ If you still need custom headers, define them AFTER CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
