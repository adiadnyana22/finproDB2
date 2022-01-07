import sql from 'mssql';
import sqlConfig from '../../variables/database';

export default async (req, res) => {
    if(req.method === 'POST'){
        const loginData = {...req.body};
        let result = {}

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const data = await sql.query`SELECT * FROM Access WHERE username=${loginData.username} AND password=${loginData.password}`
            if(data.recordset.length === 1){
                const employeeData = await sql.query`SELECT employeeID, employeeGender FROM Employee WHERE accessID=${data.recordset[0].accessID}`
                result.username = loginData.username;
                result.outletID = data.recordset[0].outletID;
                result.role = data.recordset[0].role;
                employeeData.recordset.length ? result.employeeID = employeeData.recordset[0].employeeID : '';
                employeeData.recordset.length ? result.employeeGender = employeeData.recordset[0].employeeGender : '';
            } else {
                res.status(200).json({ message: 'Gagal' });
            }
        } catch (err) {
            console.log(err)
        }
        res.status(200).json(result);
    }
}