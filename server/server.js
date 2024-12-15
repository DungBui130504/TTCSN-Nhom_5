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

app.post('/updateStudent', async (req, res) => {
    try {
        // Kết nối với SQL Server
        const pool = await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        // Lấy dữ liệu từ body của request
        let { id, Name, Phone, Email, tk, mk, Birth, Xa, Huyen, Tinh } = req.body;

        // Sử dụng Prepared Statements với các biến input
        const result = await pool.request()
            .input('Name', sql.NVarChar, Name) // Dùng NVarChar để hỗ trợ Unicode
            .input('Phone', sql.VarChar, Phone)
            .input('Email', sql.VarChar, Email)
            .input('id', sql.Int, id)
            .input('Birth', sql.NVarChar, Birth)
            .input('Xa', sql.NVarChar, Xa)
            .input('Huyen', sql.NVarChar, Huyen)
            .input('Tinh', sql.NVarChar, Tinh)
            .query(`UPDATE SinhVien SET TenSV = @Name, SoDienThoai = @Phone, Email = @Email, NgaySinh = @Birth, Xa = @Xa, Huyen = @Huyen, Tinh = @Tinh WHERE MaSV = @id`);

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

        const result = await sql.query(`select distinct D.TenMonHoc,D.MaLop, D.TenLop, f.TinChi,

 D.DiemTx1, D.DiemTx2,D.DiemGiuaKy,D.DiemCuoiKy, 

round((f.HsTx1 * D.DiemTx1 + f.HsTx2 * D.DiemTx2+ D.DiemGiuaKy * f.HsGiuaKy+ D.DiemCuoiKy* f.HsCuoiKy), 2) as N'DiemTichLuyMon'

from  Diem D 
join SinhVienTrongLop t on D.MaLop = t.MaLop
join MonHoc f on D.MaMonHoc=f.MaMonHoc
where D.MaSV='${id}'`);

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

        const result = await sql.query(`select distinct N.MaNganh,N.MaMonHoc, N.TenMonHoc, N.MaLop, N.TenLop, Lop.NgayThi, Lop.ThoiGianThi from Lop
INNER join SinhVienTrongLop N
on Lop.MaLop = N.MaLop
where N.MaSV='${id}'`);

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

app.post('/getSumStudent', async (req, res) => {
    const { ID } = req.body

    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`SELECT COUNT(DISTINCT L.MaSV) AS SoLuongSinhVienMoiLop FROM SinhVienTrongLop L JOIN Lop o ON L.MaLop = o.MaLop WHERE MaGV = '${ID}' GROUP BY o.MaLop, o.TenLop;`);

        res.status(200).json({
            resData: result.recordset
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

        let { id, name, phone, email } = req.body;

        // Khởi tạo một yêu cầu mới
        const request = new sql.Request();

        const result = await request
            .input('Name', sql.NVarChar, name) // Dùng NVarChar để hỗ trợ Unicode
            .input('Phone', sql.VarChar, phone)
            .input('Email', sql.VarChar, email)
            .input('id', sql.VarChar, id)
            .query(`UPDATE GiangVien SET TenGV = @Name, SoDienThoai = @Phone, Email = @Email WHERE MaGV = @id`);

        res.status(200).json({
            resData: result.rowsAffected // Cập nhật để trả về số hàng bị ảnh hưởng
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Cập nhật thất bại' });
    }
});


app.post('/subject_teacher', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`SELECT 
    N.MaNganh,
    N.MaMonHoc, 
    N.TenMonHoc, 
    Lop.MaLop, 
    Lop.TenLop, 
    Lop.NgayThi, 
    Lop.ThoiGianThi, 
    COUNT(DISTINCT N.MaSV) AS SoLuong
FROM Lop
JOIN SinhVienTrongLop N ON Lop.MaLop = N.MaLop
WHERE N.MaGV = '${id}'
GROUP BY 
    N.MaNganh, 
    N.MaMonHoc, 
    N.TenMonHoc, 
    Lop.MaLop, 
    Lop.TenLop, 
    Lop.NgayThi, 
    Lop.ThoiGianThi;
`);

        res.status(200).json({
            resData: result.recordset
        })

    }
    catch (err) {
        console.log(err);

    }
})

app.post('/teacher_timetable', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body

        const result = await sql.query(`SELECT 
    TKB.Thu1, 
    TKB.Thu2, 
    TKB.ThoiGianHoc, 
    TKB.TenLop,
    COUNT(SVTL.MaSV) AS SoLuongSinhVien
FROM ThoiKhoaBieu TKB
LEFT JOIN SinhVienTrongLop SVTL ON TKB.MaLop = SVTL.MaLop
WHERE TKB.MaGV = '${id}'
GROUP BY 
    TKB.Thu1, 
    TKB.Thu2, 
    TKB.ThoiGianHoc, 
    TKB.TenLop;
`);

        res.status(200).json({
            resData: result.recordset
        })

    }
    catch (err) {
        console.log(err);

    }
})

app.post('/search_student', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { studentId, classId, id } = req.body

        const result = await sql.query(`select MaGV, MaSV, TenSV, TenMonHoc, TinChi, DiemTx1, DiemTx2, DiemGiuaKy, TenLop, MaLop from Diem where MaSV='${studentId}' and MaLop='${classId}' and MaGV = '${id}' `);

        res.status(200).json({
            resData: result.recordset
        })
    }
    catch (err) {
        console.log(err);

    }
})

app.post('/update_mark', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { ma, classId, id, tx1, tx2, giuaKy } = req.body;

        // console.log(ma, classId, id, tx1, tx2, giuaKy);

        const result = await sql.query(`UPDATE Diem SET DiemTx1 = ${Number(tx1)}, DiemTx2 = ${Number(tx2)}, DiemGiuaKy = ${Number(giuaKy)} WHERE MaSV = ${Number(ma)} AND MaLop = '${classId}' AND MaGV = '${id}'`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/search_class', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { classId, id } = req.body;

        console.log(classId, id);

        const result = await sql.query(`SELECT DISTINCT D.MaLop, D.TenLop, D.MaSV, S.TenSV, D.DiemTx1, D.DiemTx2, D.DiemGiuaKy, D.DiemCuoiKy
FROM Diem D
JOIN SinhVienTrongLop S ON D.MaSV = S.MaSV
WHERE D.MaLop = '${classId}' AND D.MaGV = '${id}'
`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/add_teacher', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { ma, ten, tk, mk, xa, huyen, tinh, sdt, email, ngaySinh } = req.body;

        const result = await sql.query(`insert into GiangVien (MaGV,TenGV, TaiKhoan, MatKhau, SoDienThoai, Email, Xa, Huyen, Tinh, NgaySinh, MaAdmin) values ('${ma}', N'${ten}', '${tk}', '${mk}', '${sdt}', '${email}', N'${xa}', N'${huyen}', N'${tinh}', '${ngaySinh}', 1)`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/list_teacher', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`select * from GiangVien`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/del_teacher', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body;

        const result = await sql.query(`delete from GiangVien where MaGV='${id}'`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/add_student', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { ma, ten, tk, mk, xa, huyen, tinh, sdt, email, ngaySinh } = req.body;

        const result = await sql.query(`insert into SinhVien (MaSV,TenSV, TaiKhoan, MatKhau, SoDienThoai, Email, Xa, Huyen, Tinh, NgaySinh) values ('${ma}', N'${ten}', '${tk}', '${mk}', '${sdt}', '${email}', N'${xa}', N'${huyen}', N'${tinh}', '${ngaySinh}')`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/list_student', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`select * from SinhVien`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/del_student', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body;

        const result = await sql.query(`delete from SinhVien where MaSV='${id}'`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/add_subject', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        // Lấy dữ liệu từ request body
        let { ma, ten, tinChi, nganh, tenN, tx1, tx2, giuaKy, cuoiKy } = req.body;

        console.log(tenN);

        // Tạo đối tượng request để truyền tham số
        const request = new sql.Request();

        // Khai báo các tham số
        request.input('MaNganh', sql.NVarChar, nganh);
        request.input('TenNganh', sql.NVarChar, tenN);
        request.input('MaMonHoc', sql.NVarChar, ma);
        request.input('TenMonHoc', sql.NVarChar, ten);
        request.input('TinChi', sql.Int, tinChi);
        request.input('HsTx1', sql.Float, tx1);
        request.input('HsTx2', sql.Float, tx2);
        request.input('HsGiuaKy', sql.Float, giuaKy);
        request.input('HsCuoiKy', sql.Float, cuoiKy);

        // Thực hiện truy vấn
        const result = await request.query(`
            -- Kiểm tra nếu ngành chưa tồn tại thì thêm mới ngành vào bảng NganhHoc
            IF NOT EXISTS (SELECT 1 FROM NganhHoc WHERE MaNganh = @MaNganh)
            BEGIN
                INSERT INTO NganhHoc (MaNganh, TenNganh)
                VALUES (@MaNganh, @TenNganh)
            END

            -- Thêm môn học vào bảng MonHoc
            INSERT INTO MonHoc (MaMonHoc, TenMonHoc, TinChi, MaNganh, HsTx1, HsTx2, HsGiuaKy, HsCuoiKy)
            VALUES (@MaMonHoc, @TenMonHoc, @TinChi, @MaNganh, @HsTx1, @HsTx2, @HsGiuaKy, @HsCuoiKy);
        `);

        // Trả về kết quả
        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});



app.post('/add_subject2', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { ma, ten, tinChi, nganh, tx1, tx2, giuaKy, cuoiKy } = req.body;

        const result = await sql.query(`INSERT INTO MonHoc (MaMonHoc, TenMonHoc, TinChi, MaNganh, HsTx1, HsTx2, HsGiuaKy, HsCuoiKy)
VALUES 
('${ma}', N'${ten}', ${tinChi}, '${nganh}', ${tx1}, ${tx2}, ${giuaKy}, ${cuoiKy});`)
        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/del_subject', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body;

        const result = await sql.query(`delete from MonHoc where MaMonHoc = '${id}'`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/list_subject', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`SELECT 
    m.MaMonHoc, 
    m.TenMonHoc, 
    m.TinChi, 
    m.MaNganh, 
    n.TenNganh,  -- Lấy tên ngành từ bảng NganhHoc
    m.HsTx1, 
    m.HsTx2, 
    m.HsGiuaKy, 
    m.HsCuoiKy
FROM MonHoc m
JOIN NganhHoc n ON m.MaNganh = n.MaNganh;
`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/update_subject', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let {
            MaMonHoc,
            updateTenMonHoc,
            updateTinChi,
            updateMaNganh,
            updateTenNganh,
            updateHsTx1,
            updateHsTx2,
            updateHsGiuaKy,
            updateHsCuoiKy
        } = req.body;

        const result = await sql.query(`                    
            UPDATE MonHoc
                    SET 
                        TenMonHoc = N'${updateTenMonHoc}', 
                        TinChi = ${updateTinChi}, 
                        MaNganh = '${updateMaNganh}', 
                        HsTx1 = ${updateHsTx1}, 
                        HsTx2 = ${updateHsTx2}, 
                        HsGiuaKy = ${updateHsGiuaKy}, 
                        HsCuoiKy = ${updateHsCuoiKy}
                    WHERE MaMonHoc = '${MaMonHoc}'
            UPDATE NganhHoc
                SET TenNganh = N'${updateTenNganh}'
                WHERE MaNganh = '${updateMaNganh}'`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi kết nối đến cơ sở dữ liệu" });
    }
});



app.post('/add_class', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { ma, ten, start, time, day } = req.body;

        const result = await sql.query(`INSERT INTO Lop (MaLop, TenLop, ThoiGianBatDau, NgayThi, ThoiGianThi, MaAdmin)
VALUES 
('${ma}', N'${ten}', '${start}', '${day}', ${time}, 1)`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/del_class', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { id } = req.body;

        const result = await sql.query(`BEGIN TRANSACTION;
DELETE FROM ThoiKhoaBieu WHERE MaLop = '${id}';
DELETE FROM Lop WHERE MaLop = '${id}';
COMMIT TRANSACTION;
`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/list_class', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        const result = await sql.query(`
            SELECT 
                Lop.MaLop,
                Lop.TenLop,
                Lop.ThoiGianBatDau,
                Lop.NgayThi,
                Lop.ThoiGianThi,
                NganhHoc.MaNganh,  -- Lấy mã ngành từ bảng NganhHoc
                COUNT(DISTINCT SinhVienTrongLop.MaSV) AS SoLuongSinhVien
            FROM 
                Lop
            LEFT JOIN SinhVienTrongLop ON Lop.MaLop = SinhVienTrongLop.MaLop
            LEFT JOIN ThoiKhoaBieu ON Lop.MaLop = ThoiKhoaBieu.MaLop
            LEFT JOIN MonHoc ON ThoiKhoaBieu.MaMonHoc = MonHoc.MaMonHoc
            LEFT JOIN NganhHoc ON MonHoc.MaNganh = NganhHoc.MaNganh  
            GROUP BY 
                Lop.MaLop, 
                Lop.TenLop, 
                Lop.ThoiGianBatDau, 
                Lop.NgayThi, 
                Lop.ThoiGianThi,
                NganhHoc.MaNganh;  -- Lấy MaNganh từ bảng NganhHoc
        `);

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});


app.post('/update_class', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { newId, MaLop } = req.body;

        console.log(newId, MaLop);

        const result = await sql.query(`
            INSERT INTO SinhVienTrongLop (MaSV, TenSV, MaAdmin, MaLop, MaMonHoc, MaGV, TenLop, TenMonHoc)
            SELECT 
                SinhVien.MaSV, 
                SinhVien.TenSV, 
                Lop.MaAdmin, 
                Lop.MaLop, 
                ThoiKhoaBieu.MaMonHoc, 
                ThoiKhoaBieu.MaGV, 
                Lop.TenLop, 
                MonHoc.TenMonHoc
            FROM 
                SinhVien
            JOIN Lop ON Lop.MaLop = '${MaLop}'
            JOIN ThoiKhoaBieu ON ThoiKhoaBieu.MaLop = Lop.MaLop
            JOIN MonHoc ON MonHoc.MaMonHoc = ThoiKhoaBieu.MaMonHoc
            WHERE 
                SinhVien.MaSV = ${newId};
        `);

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});




app.post('/update_class2', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { TenLop, MaLop, maN, mon, gv, tg, thu1, thu2 } = req.body;

        console.log(TenLop, MaLop, maN, mon, gv, tg, thu1, thu2);

        // Khai báo tham số SQL
        const request = new sql.Request();
        request.input('maN', sql.NVarChar, maN);
        request.input('MaLop', sql.NVarChar, MaLop);
        request.input('TenLop', sql.NVarChar, TenLop);
        request.input('thu1', sql.NVarChar, thu1);
        request.input('thu2', sql.NVarChar, thu2);
        request.input('mon', sql.NVarChar, mon);
        request.input('gv', sql.NVarChar, gv);
        request.input('tg', sql.Int, tg);

        // Kiểm tra nếu ngành học chưa có trong bảng NganhHoc
        const checkNganhHoc = await request.query(`
            SELECT COUNT(*) AS Count 
            FROM NganhHoc 
            WHERE MaNganh = @maN
        `);

        if (checkNganhHoc.recordset[0].Count === 0) {
            return res.status(400).json({ error: "Ngành học chưa có trong cơ sở dữ liệu. Vui lòng tạo ngành trước." });
        }

        // Kiểm tra nếu lớp học chưa có trong bảng Lop
        const checkLop = await request.query(`
            SELECT COUNT(*) AS Count, MaNganh 
            FROM Lop 
            WHERE MaLop = @MaLop
            GROUP BY MaNganh
        `);

        if (checkLop.recordset[0].Count === 0) {
            // Nếu lớp học chưa có, chèn lớp vào bảng Lop và liên kết với ngành
            await request.query(`
                INSERT INTO Lop (MaLop, TenLop, MaNganh)
                VALUES (@MaLop, @TenLop, @maN)
            `);
        } else {
            // Nếu lớp đã tồn tại và chưa thuộc ngành, cập nhật ngành cho lớp
            if (!checkLop.recordset[0].MaNganh) {
                await request.query(`
                    UPDATE Lop
                    SET MaNganh = @maN
                    WHERE MaLop = @MaLop
                `);
            }
        }

        // Chèn thời khóa biểu vào bảng ThoiKhoaBieu
        const result = await request.query(`
            INSERT INTO ThoiKhoaBieu (
                Thu1, 
                Thu2, 
                MaLop, 
                MaMonHoc, 
                ThoiGianHoc, 
                MaGV, 
                MaNganh, 
                TenLop
            ) 
            SELECT 
                @thu1, 
                @thu2,  
                @MaLop,   
                @mon,   
                @tg,         
                @gv,   
                MonHoc.MaNganh, 
                @TenLop 
            FROM 
                MonHoc
            INNER JOIN 
                GiangVien ON GiangVien.MaGV = @gv 
            WHERE 
                MonHoc.MaMonHoc = @mon;
        `);

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});





app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
