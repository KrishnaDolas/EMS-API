import Salary from '../Modules/Salary.js'
import Employee from '../Modules/Employee.js'

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    // Parse values to integers
    const parsedBasicSalary = parseInt(basicSalary);
    const parsedAllowances = parseInt(allowances);
    const parsedDeductions = parseInt(deductions);

    // Calculate netSalary
    const totalSalary = parsedBasicSalary + parsedAllowances - parsedDeductions;

    // Create new Salary document
    const newSalary = new Salary({
      employeeId,
      basicSalary: parsedBasicSalary,
      allowance: parsedAllowances, // schema expects 'allowance' (singular)
      deductions: parsedDeductions,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    return res.status(500).json({ success: false, error: 'Salary Add Server Error' });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    // Try direct employeeId
    let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

    if (!salary || salary.length === 0) {
      // Try resolving employee by userId
      const employee = await Employee.findOne({ userId: id });

      if (employee) {

        salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
      } else {
      }
    }

    // Final check if salary was found
    if (!salary || salary.length === 0) {
      return res.status(200).json({ success: true, salary: [] }); // Return empty array, not 404
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Salary Get Server Error' });
  }
};





export { addSalary,getSalary };