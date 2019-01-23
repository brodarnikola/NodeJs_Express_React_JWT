let mysql = require('mysql');
let util = require('util');

/* let con = mysql.createConnection({
    host: "localhost",
    user: "rootLetala",
    password: "natalija21",
    database: "nodejstestnabaza"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
}); */

let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "rootLetala",
    password: "natalija21",
    database: "nodejstestnabaza"
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
});

/* function inTransaction(pool, body, callback) {

    pool.getConnection(function (err, conn) {

        if (err) return callback(err);

        conn.beginTransaction(function (err) {
            if (err) return done(err);

            body(conn, function (err) {
                // Commit or rollback transaction, then proxy callback
                let args = arguments;

                if (err) {
                    if (err == 'rollback') {
                        args[0] = err = null;
                    }
                    conn.rollback(function () {
                        done.apply(this, args)
                    });
                } else {
                    conn.commit(function (err) {
                        args[0] = err;
                        done.apply(this, args)
                    })
                }
            });

            function done() {
                conn.release();
                callback.apply(this, arguments);
            }
        });
    })
} */

pool.query = util.promisify(pool.query); // Magic happens here.

module.exports = pool;