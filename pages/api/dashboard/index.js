import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const data = {};

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            let temp;
            temp = await sql.query`SELECT SUM(totalPrice) AS Sales FROM [Order]`;
            data.sales = temp.recordset[0].Sales;
            temp = await sql.query`SELECT COUNT(*) AS [Order] FROM [Order]`;
            data.order = temp.recordset[0].Order;
            temp = await sql.query`SELECT COUNT(*) AS [Customer] FROM [Customer]`;
            data.customer = temp.recordset[0].Customer;
            temp = await sql.query`SELECT COUNT(*) AS [Employee] FROM [Employee]`;
            data.employee = temp.recordset[0].Employee;
            temp = await sql.query`SELECT orderDate, totalPrice FROM [Order]`;
            data.orderDetail = temp.recordset;
        } catch (err) {
            console.log(err)
        }
        res.status(200).json(data);
    }
}