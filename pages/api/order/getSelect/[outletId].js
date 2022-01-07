import sql from 'mssql';
import sqlConfig from '../../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { outletId } = req.query;
        let orders = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            orders = await sql.query`SELECT Product.productID, Product.productName, Inventory.quantity, Product.productPrice FROM Product JOIN Inventory ON Product.productID = Inventory.productID JOIN Outlet ON Outlet.outletID = Inventory.outletID WHERE Outlet.outletID = ${outletId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(orders.recordset);
    }
}