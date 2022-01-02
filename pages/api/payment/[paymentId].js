import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { paymentId } = req.query;
        let payments = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            payments = await sql.query`SELECT * FROM PaymentMethod WHERE id=${paymentId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(payments.recordset[0]);
    } else if(req.method === 'PUT'){
        const { paymentId } = req.query;
        const updateData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const payments = await sql.query`UPDATE PaymentMethod SET paymentName=${updateData.paymentName} WHERE id=${paymentId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Update Success' });
    } else if(req.method === 'DELETE'){
        const { paymentId } = req.query;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const payments = await sql.query`DELETE FROM PaymentMethod WHERE id=${paymentId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Delete Success' });
    }
}