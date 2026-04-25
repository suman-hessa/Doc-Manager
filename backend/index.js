import dotenv from "dotenv"
import app from "./app.js"
import connectDb from "./src/db/index.js";


dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8000;


connectDb().then(()=>{
    app.listen(port, ()=>{
    console.log(`️✅ The app is listening to port: http://localhost:${port}`)
    })
}).catch((err)=>{
    console.error("❌ The mongoDB was not connected", err);
})
