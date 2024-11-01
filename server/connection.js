const sql = require("mssql");

const config = {
    "user": "ark", // Database username
    "password": "123456789", // Database password
    "server": "localhost", // Server IP address
    "database": "Quanlisinhvien", // Database name
    "options": {
        encrypt: false, // Không mã hóa
        enableArithAbort: true, // Cấu hình SQL Server yêu cầu
        charset: 'utf8' // Đảm bảo mã hóa UTF-8
    },
    // "driver": 'msnodesqlv8'
};

const connect = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
})

module.exports = {
    config: config,
    sql: sql
}