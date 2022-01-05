import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        const { outletId } = req.query;
        let orders = [];

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            orders = await sql.query`SELECT [Order].orderID, Employee.employeeName, Customer.customerName, PaymentMethod.paymentName, totalPrice FROM [Order] JOIN Customer ON [Order].customerID = Customer.customerID JOIN Employee ON [Order].employeeID = Employee.employeeID JOIN PaymentMethod ON [Order].paymentID = PaymentMethod.paymentID WHERE outletID = ${outletId}`
        } catch (err) {
            console.log(err)
        }

        res.status(200).json(orders.recordset);
    }
}