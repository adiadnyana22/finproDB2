import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let customers = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            customers = await sql.query`SELECT * FROM Customer`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(customers.recordset);
    } else if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            customers = await sql.query`INSERT INTO Customer(customerName, customerAddress, customerPhone, customerGender) VALUES (${newData.customerName}, ${newData.customerAddress}, ${newData.customerPhone}, ${newData.customerGender})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}