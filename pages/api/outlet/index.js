import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let outlets = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            outlets = await sql.query`SELECT * FROM Outlet`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(outlets.recordset);
    } else if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO Outlet(outletName, outletAddress) VALUES (${newData.outletName}, ${newData.outletAddress})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}