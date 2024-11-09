import React, { useState, useEffect } from "react";
import style from './ManageSubject.module.css'
import axios from "axios";

function ManageSubject() {
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [tinChi, setTinChi] = useState();
    const [nganh, setNganh] = useState('');
    const [tenN, setTenN] = useState('');
    const [tx1, setTx1] = useState();
    const [tx2, setTx2] = useState();
    const [giuaKy, setGiuaKy] = useState();
    const [cuoiKy, setCuoiKy] = useState();
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);

    const handleAdding = async () => {
        if (tx1 < 0 || tx2 < 0 || giuaKy < 0 || cuoiKy < 0) {
            window.alert('Điểm không được âm')
            return;
        }
        if (tx1 > 10 || tx2 > 10 || giuaKy > 10 || cuoiKy > 10) {
            window.alert('Điểm không lớn hơn 10')
            return;
        }

        try {
            let response = await axios.post('http://localhost:8000/add_subject', { ma, ten, tinChi, nganh, tenN, tx1, tx2, giuaKy, cuoiKy });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi thêm
        }
        catch (err) {
            console.log(err);
            window.alert('Thêm không thành công');
        }
    };

    const handleDel = async (MaMonHoc) => {
        try {
            let response = await axios.post('http://localhost:8000/del_subject', { id: MaMonHoc });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi xóa
        }
        catch (err) {
            console.log(err);
            window.alert('Xóa không thành công');
        }
    };

    const handleUpdate = async (MaMonHoc) => {

    }

    useEffect(() => {
        const list = async () => {
            try {
                let response = await axios.post('http://localhost:8000/list_subject');
                console.log(response.data.resData);
                setData(response.data.resData);
            } catch (err) {
                console.log(err);
                window.alert('Lấy danh sách không thành công');
            }
        };

        list();
    }, [check]);

    return (
        <div className={style["subject-container"]}>
            <div className={style["add-container"]} id='here5'>
                <div className={style["input"]}>
                    <div className={style["box1"]}>
                        <input
                            type="text"
                            placeholder="Nhập mã môn học"
                            value={ma}
                            onChange={(e) => setMa(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập tên môn học"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập số tín chỉ"
                            value={tinChi}
                            onChange={(e) => setTinChi(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập tên ngành"
                            value={tenN}
                            onChange={(e) => setTenN(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nhập mã ngành"
                            value={nganh}
                            onChange={(e) => setNganh(e.target.value)}
                        />
                    </div>
                    <div className={style["box2"]}>
                        <input
                            type="text"
                            placeholder="Nhập hệ số tx1"
                            value={tx1}
                            onChange={(e) => setTx1(Number(e.target.value))}
                        />
                        <input
                            type="text"
                            placeholder="Nhập hệ số tx2"
                            value={tx2}
                            onChange={(e) => setTx2(Number(e.target.value))}
                        />
                    </div>
                    <div className={style["box3"]}>
                        <input
                            type="text"
                            placeholder="Nhập hệ số giữa kỳ"
                            value={giuaKy}
                            onChange={(e) => setGiuaKy(Number(e.target.value))}
                        />
                        <input
                            type="text"
                            placeholder="Nhập hệ số cuối kỳ"
                            value={cuoiKy}
                            onChange={(e) => setCuoiKy(Number(e.target.value))}
                        />
                    </div>
                    <button className={style['add']} onClick={handleAdding}>Thêm môn học</button>
                </div>
            </div>
            <div className={style["list-container"]} id='here6'>
                <table
                    style={{
                        borderCollapse: 'collapse', width: '150%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
                    }}
                >

                    <thead>
                        <tr>
                            <th>Mã Môn</th>
                            <th>Tên Môn</th>
                            <th>Tín Chỉ</th>
                            <th>Mã Ngành</th>
                            <th>Tên Ngành</th>
                            <th>Hệ Số Tx1</th>
                            <th>Hệ Số Tx2</th>
                            <th>Hệ Số Giữa Kỳ</th>
                            <th>Hệ Số Cuối Kỳ</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className={style['myBody']}>
                        {data.map((subject, i) => (
                            <tr key={i}>
                                <td>{subject.MaMonHoc}</td>
                                <td><input type="text" placeholder={subject.TenMonHoc} className={style['this']} /></td>
                                <td><input type="text" placeholder={subject.TinChi} /></td>
                                <td><input type="text" placeholder={subject.MaNganh} /></td>
                                <td><input type="text" placeholder={subject.TenNganh} className={style['this']} /></td>
                                <td><input type="text" placeholder={subject.HsTx1} /></td>
                                <td><input type="text" placeholder={subject.HsTx2} /></td>
                                <td><input type="text" placeholder={subject.HsGiuaKy} /></td>
                                <td><input type="text" placeholder={subject.HsCuoiKy} /></td>
                                <td><button onClick={() => handleUpdate(subject.MaMonHoc)}>Sửa môn học</button></td>
                                <td><button onClick={() => handleDel(subject.MaMonHoc)}>Xóa</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageSubject;