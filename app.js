require("dotenv").config();
const express =require ("express");
const StudentRoutes=require("./routes/students/departmentRoutes");
const db=require("./db/Schemas/index")
const app = new express();
const port =process.env.PORT || 8080;
db();
app.use(express.json()); 
app.use("/departmentRoutes",StudentRoutes);
app.listen(port,()=>{
    console.log(`Express app listening at http://localhost:${port}`);
})
