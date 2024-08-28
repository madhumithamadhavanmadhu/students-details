const express=require('express');
const router =express.Router();
const details=require("../../db/Schema/studentSchema")
router.get("/", async (req, res) => {
    try {
        const queryParams = req.query;
        const filters = {};
        if (queryParams.Studentname) {
            filters.Studentname = {
                $regex: `^${queryParams.Studentname}`,
                $options: "i", 
            };
        }
        if (queryParams.department) {
            filters.department = queryParams.department;
        }
        const Details = await details.find(filters);
        res.json(Details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/",async(req,res)=>{
    try{
    const StudentsData=req.body;
    const newData=new details(StudentsData);
    await newData.save();
    res.json({
        message:"StudentsDetails added successfully"
    });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
     }
})
router.put("/:id",async(req,res)=>{
    try{
        const StudentId=req.params.id;
        const updateStudentsData=req.body;
        await details.findByIdAndUpdate(StudentId,updateStudentsData);
        res.json({
            message:"StudentsDetails updated successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})
router.delete("/:Studentname",async(req,res)=>{
    try{
        const name=req.params.Studentname;
        const DeleteStudentData=req.body;
        await details.findOneAndDelete(name,DeleteStudentData);
        res.json({
            message:"StudentsDetails Deleted successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})
router.delete("/:department",async(req,res)=>{
    try{
        const name=req.params.department;
        const DeleteStudentData=req.body;
        await details.findOneAndDelete(name,DeleteStudentData);
        res.json({
            message:"StudentsDetails Deleted successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})
module.exports=router;