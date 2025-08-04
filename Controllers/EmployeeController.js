import multer, { diskStorage } from "multer";
import Employee from "../Modules/Employee.js"
import User from "../Modules/User.js"
import bcrypt from 'bcrypt'
import path from 'path';
import Department from '../Modules/Department.js';

const storage = multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const addEmployee = async (req,res)=>{
    try{
    const {name,email,employeeId,dob,gender,maritalStatus,designation,department,salary,password,role}=req.body;
    const existingUser = await User.findOne({email})
    if(existingUser ){
        return res.status (400).json({success:false,error:'User Already Registered In Employee'})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        name,email,password:hashPassword,role,profileImage: req.file ? req.file.filename : ''
    })
    const savedUser = await newUser.save()

    const newEmployee = new Employee({
        userId: savedUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
    })

    await newEmployee.save()
    return res.status(200).json({success:true,message:'Employee Created'})
    } catch(error){
        console.log(error.message);
        
        return res.status(500).json({success:false,error:'Server Error In Adding Employee'})
    }
}

const getEmployees = async (req,res)=>{
     try {
    const {id}=req.params;
   const employees = await Employee.find().populate('userId',{password:0}).populate('department')
     return res.status(200).json({success:true,employees})
    } catch (error) {
         return res.status(500).json({success:false,error:'Get Employees Server Error'})
    }
}

const getEmployee = async(req,res)=>{
    const {id}= req.params;
      try {
        let employee;
    const {id}=req.params;
   employee = await Employee.findById({_id: id}).populate('userId',{password:0}).populate('department');
   if(!employee){
    employee = await Employee.findOne({userId: id}).populate('userId',{password:0}).populate('department');
   }
     return res.status(200).json({success:true,employee})
    } catch (error) {
         return res.status(500).json({success:false,error:'Get Employees Server Error'})
    }
}

const updateEmployee = async(req,res)=>{
    try {
        const { id }= req.params;
            const {name,maritalStatus,designation,department,salary}=req.body;
            const employee = await Employee.findById({_id:id})
            if(!employee){
                return res.status(404).json({success:false,error:'Employee Not Found'})
            }
            const user = await User.findById({_id:employee.userId})
             if(!user){
                return res.status(404).json({success:false,error:'User Not Found'})
            }
            const updateUser = await User.findByIdAndUpdate({_id:employee.userId},{name})
            const  updateEmployee = await Employee.findByIdAndUpdate({_id:id},{
                maritalStatus,designation,salary,department
            })
            if(!updateEmployee || !updateUser){
                 return res.status(404).json({success:false,error:'document Not Found'})
            }
            return res.status(200).json({success: true, message: "Employee Update"})
    } catch (error) {
                 return res.status(500).json({success:false,error:'Update Employees Server Error'})

    }
}

const fetchEmployeesByDepId = async (req,res) => {
      const {id}= req.params;
      try {
    const {id}=req.params;
   const employees = await Employee.find({department: id})
     return res.status(200).json({success:true,employees})
    } catch (error) {
         return res.status(500).json({success:false,error:'Get Employees By Dep Id Server Error'})
    }
}

export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId}