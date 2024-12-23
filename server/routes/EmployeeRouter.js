import express from 'express';
import EmployeeController from '../controller/EmployeeController.js';

const employeeRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
employeeRouter.post('/create', EmployeeController.createEmployee);
employeeRouter.get('/search/:value/:searchBy', EmployeeController.getEmployeeByCriteria);
employeeRouter.get('/getid', EmployeeController.generateEmployeeId);
employeeRouter.put('/update', EmployeeController.updateEmployee);
employeeRouter.delete('/delete/:email', EmployeeController.deleteEmployeeByEmail);

export default employeeRouter;
