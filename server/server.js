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
            .input('id', sql.Int, id)
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

        const result = await sql.query(`SELECT DISTINCT S.MaNganh, S.MaMonHoc, S.TenMonHoc, S.MaLop, S.TenLop, COUNT(DISTINCT S.MaSV) AS SoLuong FROM SinhVienTrongLop S JOIN ThoiKhoaBieu T ON S.MaMonHoc = T.MaMonHoc WHERE S.MaGV = '${id}' GROUP BY S.MaNganh, S.MaMonHoc, S.TenMonHoc, S.MaLop, S.TenLop, T.ThoiGianHoc`);

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

        const result = await sql.query(`select Thu1, Thu2, ThoiGianHoc, TenLop from ThoiKhoaBieu where MaGV ='${id}'`);

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

        const result = await sql.query(`select distinct  D.MaLop,D.TenLop,D.MaSV, S.TenSV, D.DiemTx1, D.DiemTx2,D.DiemGiuaKy,D.DiemCuoiKy from Diem D join SinhVienTrongLop S on D.MaSV=S.MaSV where D.MaLop='${classId}' and D.MaGV='${id}'`)

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

        const result = await sql.query(`insert into SinhVien (MaSV,TenSV, TaiKhoan, MatKhau, SoDienThoai, Email, Xa, Huyen, Tinh, NgaySinh, MaAdmin) values ('${ma}', N'${ten}', '${tk}', '${mk}', '${sdt}', '${email}', N'${xa}', N'${huyen}', N'${tinh}', '${ngaySinh}', 1)`)

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

        let { ma, ten, tinChi, nganh, tenN, tx1, tx2, giuaKy, cuoiKy } = req.body;

        const result = await sql.query(`begin transaction
insert into MonHoc (MaMonHoc, TenMonHoc, TinChi, MaNganh, TenNganh )
values 
('${ma}',N'${ten}', ${tinChi},'${nganh}',N'${tenN}')

insert into HeSoDiem(MaMonHoc, TenMonHoc, HsTx1,HsTx2, HsGiuaKy, HsCuoiKy)
values 
('${ma}',N'${ten}', ${tx1}, ${tx2}, ${giuaKy}, ${cuoiKy})
commit`)
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

        const result = await sql.query(`begin transaction
delete from HeSoDiem
where  MaMonHoc='${id}' 
delete from MonHoc
where  MaMonHoc='${id}'  
commit`)

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

        const result = await sql.query(`select * from MonHoc`)

        res.status(200).json({
            resData: result.recordset
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Có lỗi xảy ra khi cập nhật dữ liệu" });
    }
});

app.post('/add_class', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server');

        let { ma, ten, tg } = req.body;

        const result = await sql.query(`INSERT INTO Lop (MaLop, TenLop, ThoiGianBatDau, MaAdmin)
VALUES 
('${ma}', N'${ten}', '${tg}', 1)`)

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

        const result = await sql.query(`delete from Lop
where MaLop ='${id}'`)

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

        const result = await sql.query(`select * from Lop`)

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
