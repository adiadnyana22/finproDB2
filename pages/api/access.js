import sql from 'mssql';
import sqlConfig from '../../variables/database';

export default async (req, res) => {
    if(req.method === 'GET'){
        let accessData;

        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            accessData = await sql.query`SELECT * FROM Access`
        } catch (err) {
            console.log(err)
        }
        res.status(200).json(accessData.recordset);
    }
}