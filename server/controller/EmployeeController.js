import Employee from '../models/Employee.js';
import logger from '../utils/logger.js';
import { sendEmployeeInitialPassword } from '../utils/sendMail.js';
import UserController from './UserController.js';

const EmployeeController = {

    createEmployee: async (req, res) => {
        try {

            logger.info("Recieved Employee Create Request : " + JSON.stringify(req.body));
            const {
                employeeId,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                nic,
                no,
                street,
                city,
                email,
                mobileNo,
                role } = req.body;

            let password = '';
            for (let i = 0; i < 8; i++) {
                password += Math.floor(Math.random() * 10);
            }

            sendEmployeeInitialPassword(firstName, email, password);

            const newUser = await UserController.createUser(email, password, role);

            const employee = new Employee({
                employeeId,
                firstName,
                lastName,
                dateOfBirth,
                gender,
                nic,
                no,
                street,
                city,
                email,
                mobileNo,
                role,
                user: newUser._id
            });

            await employee.save();
            res.status(201).json(employee);
            logger.info("Employee create successful");

        } catch (error) {
            logger.error("Employee create failed");
            res.status(400).json({ message: error.message });
        }
    },

    updateEmployee: async (req, res) => {
        try {
            logger.info("Employee Update Request Recieved : " + JSON.stringify(req.body));

            const updatedEmployee = await Employee.findOneAndUpdate(
                { email: req.body.email },
                req.body,
                { new: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            logger.info("Emoployee update successful");
            res.status(200).json(updatedEmployee);
        } catch (error) {
            logger.error("Employee update failed");
            logger.error(error);
            res.status(400).json({ message: error.message });
        }
    },

    getEmployeeByCriteria: async (req, res) => {
        try {

            var employee;
            switch (req.params.searchBy) {
                case "userId":
                    logger.info("Search Employee By UserId Request Received: " + req.params.value);
                    employee = await Employee.findOne({ user: req.params.value });
                    break;
                case "employeeId":
                    logger.info("Search Employee By employeeId Request Received: " + req.params.value);
                    employee = await Employee.findOne({ employeeId: req.params.value });
                    break;
                case "email":
                    logger.info("Search Employee By email Request Received: " + req.params.value);
                    employee = await Employee.findOne({ email: req.params.value });
                    break;
                default:
                    logger.info("Search Employee By Invalid Criteria Request Received: " + req.params.searchBy);
                    return res.status(400).json({ message: "Invalid Criteria" });
            }
            
            if (!employee) {
                logger.error("Employee not found");
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (error) {
            logger.error("Error getting Employee");
            res.status(500).json({ message: error.message });
        }
    },

    generateEmployeeId: async (req, res) => {
        try {

            logger.info("Employee Id genertion request recieved");

            const count = await Employee.countDocuments();
            let empCount = count + 1000;
            let employeeId = "E" + empCount;
            res.status(200).json(employeeId);

        } catch (error) {
            logger.error("Error getting EmployeeId");
            res.status(500).json({ message: error.message });
        }
    },

    deleteEmployeeByEmail: async (req, res) => {
        try {
            logger.info("Employee delete request recieved");

            var userDeleteStatus = UserController.deleteUser(req.params.email);

            if (userDeleteStatus) {
                const employee = await Employee.findOneAndDelete({ email: req.params.email });
                if (!employee) {
                    logger.error("Employee " + req.params.email + " not found");
                    return res.status(404).json({ message: 'Employee not found' });
                }
                logger.info("Employee " + req.params.email + " deleted successfully");
                res.status(200).json({ message: 'Employee deleted' });
            }

        } catch (error) {
            logger.error("Employee " + req.params.email + " delete Failed");
            res.status(400).json({ message: error.message });
        }
    },

}
export default EmployeeController;