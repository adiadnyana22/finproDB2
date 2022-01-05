import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { productId } = req.query;
        let products = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            products = await sql.query`SELECT * FROM Product WHERE productID=${productId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(products.recordset[0]);
    } else if(req.method === 'PUT'){
        const { productId } = req.query;
        const updateData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const products = await sql.query`UPDATE Product SET productName=${updateData.productName}, productType=${updateData.productType}, productPrice=${updateData.productPrice} WHERE productID=${productId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Update Success' });
    } else if(req.method === 'DELETE'){
        const { productId } = req.query;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const products = await sql.query`DELETE FROM Product WHERE productID=${productId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Delete Success' });
    }
}