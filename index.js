const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


require('dotenv').config();
require("./Modals/db")
const PORT=process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} `)
})