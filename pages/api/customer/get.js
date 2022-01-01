import sql from 'mssql';

const sqlConfig = {
    user: 'SA',
    password: 'Janganmikir2#',
    database: 'Franchise',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export default async (req, res) => {
    let customers = [];

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        customers = await sql.query`SELECT * FROM Customer`
    } catch (err) {
        console.log(err)
    }

    res.status(200).json(customers.recordset);
}