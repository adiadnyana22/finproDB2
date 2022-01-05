import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let products = {};
        products.recordset = [];
        const { param } = { ...req.query }

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            if(param.length === 2) products = await sql.query`SELECT Inventory.outletID, Inventory.quantity, Product.productID, Product.productName, Product.productType, Product.productPrice FROM Inventory JOIN Product ON Inventory.productID = Product.productID WHERE outletID = ${param[0]} AND Inventory.productID = ${param[1]}`;
            else products = await sql.query`SELECT Inventory.outletID, Inventory.quantity, Product.productID, Product.productName, Product.productType, Product.productPrice FROM Inventory JOIN Product ON Inventory.productID = Product.productID WHERE outletID = ${param[0]}`;
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(products.recordset);
    }
}