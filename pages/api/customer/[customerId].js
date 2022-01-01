import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { customerId } = req.query;
        let customers = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            customers = await sql.query`SELECT * FROM Customer WHERE id=${customerId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(customers.recordset[0]);
    } else if(req.method === 'PUT'){
        const { customerId } = req.query;
        const updateData = {...req.body};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const customers = await sql.query`UPDATE Customer SET customerName=${updateData.customerName}, customerAddress=${updateData.customerAddress}, customerPhone=${updateData.customerPhone}, customerGender=${updateData.customerGender} WHERE id=${customerId}`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Update Success' });
    }
}