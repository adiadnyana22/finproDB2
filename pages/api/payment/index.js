import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let payments = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            payments = await sql.query`SELECT * FROM PaymentMethod`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(payments.recordset);
    } else if(req.method === 'POST'){
        const newData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO PaymentMethod(paymentName) VALUES (${newData.paymentName})`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}