import Department from "../Modules/Department.js";

const getDepartments=async(req,res)=>{
    try {
        const departments = await Department.find()
        return res.status(200).json({success:true,departments})
    } catch (error) {
         return res.status(500).json({success:false,error:'Get Department Server Error'})
    }
}

const addDepartment = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body); // 👀 log incoming data

    const { dep_name, description } = req.body;

    if (!dep_name) {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();

    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error("Add Department Error:", error); // 👀 log exact server error
    return res.status(500).json({ success: false, error: "Add Department Server Error" });
  }
};

const getDepartment = async(req,res)=>{
  try {
    const {id}=req.params;
    const department = await Department.findById({_id:id})
     return res.status(200).json({success:true,department})
    } catch (error) {
         return res.status(500).json({success:false,error:'Get Department Server Error'})
    }
  } 

  const updateDepartment = async(req,res)=>{
    try {
      const {id}= req.params;
      const {dep_name,description}= req.body
      const updateDep = await Department.findByIdAndUpdate({_id: id},{
        dep_name,
        description
      })
      return res.status(200).json({success:true,updateDep})
    } catch (error) {
         return res.status(500).json({success:false,error:'Edit Department Server Error'})
    }
    }

  const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDep = await Department.findById(id);

    if (!deletedDep) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

    // ✅ call deleteOne() on the document
    await deletedDep.deleteOne();

    return res.status(200).json({ success: true, deletedDep });
  } catch (error) {
    console.error("Delete Department Error:", error);
    return res.status(500).json({ success: false, error: "Delete Department Server Error" });
  }
};


  


export{addDepartment,getDepartments,getDepartment,updateDepartment,deleteDepartment}