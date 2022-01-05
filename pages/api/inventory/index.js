import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO Inventory(outletID, productID, quantity) VALUES (${newData.outletID}, ${newData.productID}, ${newData.quantity})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    } else if(req.method === 'PUT'){
        const updateData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`UPDATE Inventory SET quantity=${updateData.quantity} WHERE outletID=${updateData.outletID} AND productID=${updateData.productID}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Update Success' });
    } else if(req.method === 'DELETE'){
        const { productID, outletID } = { ...req.body };

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`DELETE FROM Inventory WHERE outletID=${outletID} AND productID=${productID}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Delete Success' });
    }
}