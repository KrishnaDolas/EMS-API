import Leave from '../Modules/Leave.js'
import Employee from '../Modules/Employee.js';

const addLeave = async (req, res) => {
  try {
    console.log('Incoming body:', req.body);

    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, error: "userId is required in request body" });
    }

    // ✅ Find the Employee that matches this userId
    const employee = await Employee.findOne({ userId: userId });
    console.log('Found employee:', employee);

    if (!employee) {
      return res.status(404).json({ success: false, error: "No Employee found for given userId" });
    }

    // ✅ Use employee._id for the relation
    const newLeave = new Leave({
      employeeId: employee._id, // <-- fix: real Employee._id
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    console.log('Leave saved:', newLeave);

    return res.status(200).json({ success: true, leave: newLeave });
  } catch (error) {
    console.error('Leave Add Error:', error);
    return res.status(500).json({ success: false, error: 'Leave Add Server Error' });
  }
};

const getLeave = async (req, res) => {
  try {
    const id = req.params.id;

    // Try finding by userId first
    let employee = await Employee.findOne({ userId: id });

    // If not found, try finding by _id
    if (!employee) {
      employee = await Employee.findById(id);
    }

    if (!employee) {
      return res.status(404).json({ success: false, error: "No Employee found for this ID" });
    }

    const leaves = await Leave.find({ employeeId: employee._id }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });

    res.json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



const getLeaves = async (req, res) => {
  try {
   const leaves = await Leave.find().populate({
  path: "employeeId",
  populate: [
    {
      path: "department",
      select: "dep_name"
    },
    {
      path: "userId",
      select: "name" // ✅ FIX: pull name!
    }
  ]
})

    res.json({ success: true, leaves });
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getLeaveDetail = async (req,res) => {
 try {
    const {id} = req.params;
   const leave = await Leave.findById({_id: id}).populate({
  path: "employeeId",
  populate: [
    {
      path: "department",
      select: "dep_name"
    },
    {
      path: "userId",
      select: "name profileImage"
    }
  ]
})

    res.json({ success: true, leave });
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

const updateLeave = async(req,res) =>{
  try {
    const {id} = req.params;
     const leave = await Leave.findByIdAndUpdate({_id: id},{status: req.body.status})
     if(!leave){
         return res.status(404).json({ success: false, message: 'Leave Not Found' });
     }
        return res.status(200).json({ success: true});
  } catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ success: false, message: 'Leave Update Server Error' });
  }
}




export {addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave}