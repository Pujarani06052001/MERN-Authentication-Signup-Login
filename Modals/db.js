// const mongoose=require("mongoose")
// mongoose.connect("mongodb://localhost:27017/userData",
//     {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true,
//     }
// ).then(()=>{
//     console.log(`connecting successful`)
// }).catch((e)=>{
//     console.log(`no connection`)
// })
const mongoose = require("mongoose");
const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Connected Successfully");
}).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
});
