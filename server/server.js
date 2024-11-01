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

        const result = await sql.query(`SELECT TaiKhoan, MatKhau, MaSV, TenSV FROM SinhVien WHERE TaiKhoan = '${taikhoan}' AND MatKhau = '${matkhau}'`);

        // console.log(result.recordset);
        // console.log(result.recordset.length);

        res.status(200).json({
            check: result.recordset.length,
            student: result.recordset
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
            check: result.recordset.length,
            admin: result.recordset
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

app.post('/studentStatus2', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`SELECT * FROM SinhVien WHERE MaSV = '${id}'`);

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

// app.post('/updateStudent', async (req, res) => {
//     try {
//         await sql.connect(config);
//         console.log('Kết nối thành công đến SQL Server');

//         let { id, Name, Phone, Email, taikhoan, matkhau } = req.body

//         const result = await sql.query(`UPDATE SinhVien SET TenSV = N'${Name}', SoDienThoai = '${Phone}', Email = '${Email}' WHERE MaSV = '${id}'`);


//         res.status(200).json({
//             resData: result.recordset
//         })

//     }
//     catch (err) {
//         console.log(err);

//     }
// })

app.post('/updateStudent', async (req, res) => {
    try {
        // Kết nối với SQL Server
        const pool = await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        // Lấy dữ liệu từ body của request
        let { id, Name, Phone, Email, taikhoan, matkhau } = req.body;

        // Sử dụng Prepared Statements với các biến input
        const result = await pool.request()
            .input('Name', sql.NVarChar, Name) // Dùng NVarChar để hỗ trợ Unicode
            .input('Phone', sql.VarChar, Phone)
            .input('Email', sql.VarChar, Email)
            .input('id', sql.VarChar, id)
            .query(`UPDATE SinhVien SET TenSV = @Name, SoDienThoai = @Phone, Email = @Email WHERE MaSV = @id`);

        // Trả về kết quả thành công
        res.status(200).json({
            resData: result.recordset
        });
    }
    catch (err) {
        console.log('Lỗi khi cập nhật dữ liệu:', err);
        res.status(500).json({
            message: 'Cập nhật dữ liệu không thành công',
            error: err
        });
    }
});

app.post('/updateStudentAccount', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id, taikhoan, matkhau } = req.body

        const result = await sql.query(`UPDATE SinhVien SET TaiKhoan = '${taikhoan}', MatKhau = '${matkhau}' WHERE MaSV = '${id}'`);

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

        const result = await sql.query(`SELECT Diem.MaSV, Diem.TinChi, Diem.TenSV, Diem.MaLop, Diem.TenLop, Diem.MaMonHoc, Diem.TenMonHoc, Diem.DiemTx1, Diem.DiemTx2, Diem.DiemGiuaKy, Diem.DiemCuoiKy, (HsTx1 * DiemTx1 + HsTx2 * DiemTx2 + DiemGiuaKy * HsGiuaKy + DiemCuoiKy * HsCuoiKy) AS N'DiemTichLuyMon' FROM Diem JOIN HeSoDiem ON Diem.MaMonHoc = HeSoDiem.MaMonHoc WHERE Diem.MaSV=${id}`);

        res.status(200).json({
            resData: result.recordset
        })
    }
    catch (err) {
        console.log(err);

    }
})

app.post('/getSubject', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`select * from SinhVienTrongLop where MaSV=${id}`);

        res.status(200).json({
            resData: result.recordset
        })

    }
    catch (err) {
        console.log(err);

    }
})

app.post('/getTimeTable', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`select distinct SinhVienTrongLop.MaLop, ThoiKhoaBieu.Thu1, ThoiKhoaBieu.Thu2, ThoiKhoaBieu.TenLop, SinhVienTrongLop.MaSV, SinhVienTrongLop.TenSV, ThoiKhoaBieu.ThoiGianHoc from SinhVienTrongLop join ThoiKhoaBieu on SinhVienTrongLop.MaLop = ThoiKhoaBieu.MaLop where SinhVienTrongLop.MaSV = '${id}';`
        );

        res.status(200).json({
            resData: result.recordset
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

        const result = await sql.query(`SELECT *  FROM GiangVien WHERE TaiKhoan = '${taikhoan}' AND MatKhau = '${matkhau}'`);

        // console.log(result.recordset);

        // console.log(result.recordset);
        // console.log(result.recordset.length);

        res.status(200).json({
            check: result.recordset.length,
            teacher: result.recordset
        })

    }
    catch (err) {
        console.log(err);
    }

})

app.post('/update_teacher', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id, name, phone, email } = req.body

        const result = await sql.query(`UPDATE GiangVien SET TenGV = '${name}', SoDienThoai = '${phone}', Email = '${email}' WHERE MaGV = '${id}'`);

        res.status(200).json({
            resData: result.recordset
        })

    }
    catch (err) {
        console.log(err);

    }
})

app.post('/subject_teacher', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`SELECT DISTINCT S.MaNganh, S.MaMonHoc, S.TenMonHoc, S.MaLop, S.TenLop, T.ThoiGianHoc, COUNT(DISTINCT S.MaSV) AS SoLuong FROM SinhVienTrongLop S JOIN ThoiKhoaBieu T ON S.MaMonHoc = T.MaMonHoc WHERE S.MaGV = '${id}' GROUP BY S.MaNganh, S.MaMonHoc, S.TenMonHoc, S.MaLop, S.TenLop, T.ThoiGianHoc`);

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
