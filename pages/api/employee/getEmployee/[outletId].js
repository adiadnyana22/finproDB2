import sql from 'mssql';
import sqlConfig from '../../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { outletId } = req.query;
        let employees = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            employees = await sql.query`SELECT Employee.employeeID, Employee.employeeName, Employee.employeeAddress, Employee.employeeGender, Employee.employeePhone, Employee.accessID FROM Employee JOIN Access ON Employee.accessID = Access.accessID WHERE Access.outletID = ${outletId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(employees.recordset);
    }
}