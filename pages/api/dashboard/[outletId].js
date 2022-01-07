import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { outletId } = req.query;
        const data = {};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            let temp;
            temp = await sql.query`SELECT SUM(totalPrice) AS Sales FROM [Order] WHERE outletID = ${outletId}`;
            data.sales = temp.recordset[0].Sales;
            temp = await sql.query`SELECT COUNT(*) AS [Order] FROM [Order] WHERE outletID = ${outletId}`;
            data.order = temp.recordset[0].Order;
            temp = await sql.query`SELECT orderDate, totalPrice FROM [Order] WHERE outletID = ${outletId}`;
            data.orderDetail = temp.recordset;
        } catch (err) {
            console.log(err)
        }
        res.status(200).json(data);
    }
}