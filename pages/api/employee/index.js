import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let employees = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            employees = await sql.query`SELECT * FROM Employee`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(employees.recordset);
    } else if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO Employee(employeeName, employeeAddress, employeePhone, employeeGender) VALUES (${newData.employeeName}, ${newData.employeeAddress}, ${newData.employeePhone}, ${newData.employeeGender})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}