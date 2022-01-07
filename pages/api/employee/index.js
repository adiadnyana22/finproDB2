import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO Access(username, password, role, outletID) VALUES (${newData.username}, ${newData.password}, ${newData.role}, ${newData.outletID})`
            const accessData = await sql.query`SELECT accessID FROM Access WHERE username = ${newData.username} AND password = ${newData.password}`;
            const { accessID } = accessData.recordset[0];
            await sql.query`INSERT INTO Employee(employeeName, employeeAddress, employeePhone, employeeGender, accessID) VALUES (${newData.employeeName}, ${newData.employeeAddress}, ${newData.employeePhone}, ${newData.employeeGender}, ${accessID})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}