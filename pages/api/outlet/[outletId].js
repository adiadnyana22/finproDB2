import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { outletId } = req.query;
        let outlets = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            outlets = await sql.query`SELECT * FROM Outlet WHERE outletID=${outletId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(outlets.recordset[0]);
    } else if(req.method === 'PUT'){
        const { outletId } = req.query;
        const updateData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const outlets = await sql.query`UPDATE Outlet SET outletName=${updateData.outletName}, outletAddress=${updateData.outletAddress} WHERE outletID=${outletId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Update Success' });
    } else if(req.method === 'DELETE'){
        const { outletId } = req.query;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const outlets = await sql.query`DELETE FROM Outlet WHERE outletID=${outletId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Delete Success' });
    }
}