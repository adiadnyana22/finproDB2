import sql from 'mssql';
import sqlConfig from '../../../variables/database';

export default async (req, res) => {
    if(req.method === 'POST'){
        const newData = {...req.body};
        const date = new Date();
        const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            await sql.query`INSERT INTO [Order](employeeID, outletID, customerID, paymentID, orderDate, totalPrice) VALUES (${newData.employeeID}, ${newData.outletID}, ${newData.customerID}, ${newData.paymentID}, ${currDate}, ${newData.totalPrice})`
            const order = await sql.query`SELECT orderID FROM [Order] WHERE orderID = (SELECT MAX(orderID) FROM [Order])`
            newData.order.forEach( async (element) => {
                await sql.query`INSERT INTO [OrderDetail](orderID, productID, quantity) VALUES (${order.recordset[0].orderID}, ${element.productID}, ${element.quantity})`
                await sql.query`UPDATE Inventory SET quantity = quantity - ${element.quantity} WHERE productID = ${element.productID} AND outletID = ${newData.outletID}`
            });
        } catch (err) {
            console.log(err)
        }
        res.status(200).json({ message: 'Input Success' });
    }
}