import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let products = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            products = await sql.query`SELECT * FROM Product`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(products.recordset);
    } else if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO Product(productName, productType, productPrice) VALUES (${newData.productName}, ${newData.productType}, ${newData.productPrice})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}