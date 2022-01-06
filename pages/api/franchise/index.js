import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let franchise = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            franchise = await sql.query`SELECT accessID, Outlet.outletID, Outlet.outletName, role, username FROM Access JOIN Outlet ON Access.outletID = Outlet.outletID WHERE role = 'Pemilik Franchise'`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(franchise.recordset);
    } else if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO Outlet(outletName, outletAddress) VALUES (${newData.outletName}, ${newData.outletAddress})`
            const outlet = await sql.query`SELECT outletID FROM Outlet WHERE outletID = (SELECT MAX(outletID) FROM Outlet)`
            await sql.query`INSERT INTO Access(username, password, role, outletID) VALUES (${newData.username}, ${newData.password}, 'Pemilik Franchise', ${outlet.recordset[0].outletID})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    } else if(req.method === 'DELETE'){
        const { accessID, outletID } = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`DELETE FROM Access WHERE accessID=${accessID}`
            await sql.query`DELETE FROM Outlet WHERE outletID=${outletID}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Delete Success' });
    }
}