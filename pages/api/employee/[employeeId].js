import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { employeeId } = req.query;
        let employees = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            employees = await sql.query`SELECT * FROM Employee WHERE id=${employeeId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(employees.recordset[0]);
    } else if(req.method === 'PUT'){
        const { employeeId } = req.query;
        const updateData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const employees = await sql.query`UPDATE Employee SET employeeName=${updateData.employeeName}, employeeAddress=${updateData.employeeAddress}, employeePhone=${updateData.employeePhone}, employeeGender=${updateData.employeeGender} WHERE id=${employeeId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Update Success' });
    } else if(req.method === 'DELETE'){
        const { employeeId } = req.query;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const customers = await sql.query`DELETE FROM Employee WHERE id=${employeeId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Delete Success' });
    }
}