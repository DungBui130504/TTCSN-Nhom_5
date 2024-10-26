const express = require('express');
const path = require('path')
const app = express();
const port = 8000;
const { config, sql } = require('./connection')
const cors = require('cors');
const { log } = require('console');
const bodyParser = require('body-parser');

let dataStore = [];

// Cho phép tất cả nguồn
app.use(cors());

app.use(bodyParser.json());

// Đường dẫn đến thư mục public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Homepage logged in');
});

app.post('/student', async (req, res) => {
    let isSV = false

    const { taikhoan, matkhau } = req.body

    // console.log(taikhoan, matkhau);

    // dataStore.push({ taikhoan, matkhau })

    try {
        await sql.connect(config);

        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`SELECT TaiKhoan, MatKhau FROM SinhVien WHERE TaiKhoan = '${taikhoan}' AND MatKhau = '${matkhau}'`);

        // console.log(result.recordset);
        // console.log(result.recordset.length);

        res.status(200).json({
            check: result.recordset.length
        })

    }
    catch (err) {
        console.log(err);
    }

})

app.post('/teacher', async (req, res) => {
    const { taikhoan, matkhau } = req.body

    // console.log(taikhoan, matkhau);

    // dataStore.push({ taikhoan, matkhau })

    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`SELECT TaiKhoan, MatKhau FROM GiangVien WHERE TaiKhoan = '${taikhoan}' AND MatKhau = '${matkhau}'`);

        // console.log(result.recordset);

        // console.log(result.recordset);
        // console.log(result.recordset.length);

        res.status(200).json({
            check: result.recordset.length
        })

    }
    catch (err) {
        console.log(err);
    }

})

app.post('/admin', async (req, res) => {
    const { taikhoan, matkhau } = req.body

    // console.log(taikhoan, matkhau);

    // dataStore.push({ taikhoan, matkhau })

    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`SELECT TaiKhoan, MatKhau FROM Adminn WHERE TaiKhoan = '${taikhoan}' AND MatKhau = '${matkhau}'`);

        // console.log(result.recordset);

        // console.log(result.recordset);
        // console.log(result.recordset.length);

        res.status(200).json({
            check: result.recordset.length
        })

    }
    catch (err) {
        console.log(err);
    }

})

app.post('/studentStatus', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`SELECT * FROM SinhVien`);

        // console.log(result.recordset);

        // console.log(result.recordset.length);

        res.status(200).json({
            studentStatus: result.recordset
        })

    }
    catch (err) {
        console.log(err);
    }
})

app.post('/updateStudent', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id, Name, Phone, Email, tk, mk } = req.body

        const result = await sql.query(`UPDATE SinhVien SET TenSV = '${Name}', SoDienThoai = '${Phone}', Email = '${Email}' WHERE MaSV = '${id}'`);

        res.status(200).json({
            resData: result.recordset
        })

    }
    catch (err) {
        console.log(err);

    }
})

app.post('/studentID', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { tk, mk } = req.body

        const result = await sql.query(`SELECT MaSV FROM SinhVien WHERE TaiKhoan = '${tk}' AND MatKhau = '${mk}'`);

        res.status(200).json({
            resData: result.recordset
        })
    }
    catch (err) {
        console.log(err);

    }
})

app.post('/studentMark', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`SELECT * FROM Diem WHERE MaSV = '${id}'`);

        res.status(200).json({
            resData: result.recordset
        })
    }
    catch (err) {
        console.log(err);

    }
})



app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
