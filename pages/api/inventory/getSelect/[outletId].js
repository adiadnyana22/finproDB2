import sql from 'mssql';
import sqlConfig from '../../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let products = {};
        products.recordset = [];
        const { outletId } = req.query;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            products = await sql.query`SELECT Product.productID, Product.productName FROM Product WHERE NOT EXISTS(SELECT NULL FROM Inventory WHERE Product.productID = Inventory.productID AND Inventory.outletID = ${outletId})`;
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(products.recordset);
    }
}