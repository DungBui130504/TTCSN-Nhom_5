import React, { useState, useEffect } from "react";
import style from './ManageSubject.module.css'
import axios from "axios";

function ManageSubject() {
    const [ma, setMa] = useState('');
    const [ten, setTen] = useState('');
    const [tinChi, setTinChi] = useState();
    const [nganh, setNganh] = useState('');
    const [tenN, setTenN] = useState('');
    const [tx1, setTx1] = useState(-1);
    const [tx2, setTx2] = useState(-1);
    const [giuaKy, setGiuaKy] = useState(-1);
    const [cuoiKy, setCuoiKy] = useState(-1);
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);

    const [updateTenMonHoc, setUpdateTenMonHoc] = useState('');
    const [updateTinChi, setUpdateTinChi] = useState('');
    const [updateMaNganh, setUpdateMaNganh] = useState('');
    const [updateTenNganh, setUpdateTenNganh] = useState('');
    const [updateHsTx1, setUpdateHsTx1] = useState(-1);
    const [updateHsTx2, setUpdateHsTx2] = useState(-1);
    const [updateHsGiuaKy, setUpdateHsGiuaKy] = useState(-1);
    const [updateHsCuoiKy, setUpdateHsCuoiKy] = useState(-1);

    const handleAdding = async () => {
        if (tx1 < 0 || tx2 < 0 || giuaKy < 0 || cuoiKy < 0) {
            window.alert('Hệ số không được âm')
            return;
        }
        if (tx1 > 1 || tx2 > 1 || giuaKy > 1 || cuoiKy > 1) {
            window.alert('Hệ số không lớn hơn 1')
            return;
        }
        if (ma == '' || ten == '' || tinChi == '' || nganh == '' || tenN == '' || tx1 == -1 || tx2 == -1 || giuaKy == -1 || cuoiKy == -1) {
            window.alert('Phải nhập đầy đủ thông tin môn học!')
            return;
        }

        try {
            let response = await axios.post('http://localhost:8000/add_subject', { ma, ten, tinChi, nganh, tenN, tx1, tx2, giuaKy, cuoiKy });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi thêm
            window.alert('Thêm thành công!')
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
            setCheck(!check);
            window.alert('Xóa thành công!')
        }
        catch (err) {
            console.log(err);
            window.alert('Xóa không thành công');
        }
    };

    const handleUpdate = async (MaMonHoc, i) => {
        try {
            // console.log(data[i]);

            if (updateTenMonHoc === '') {
                setUpdateTenMonHoc(data[i].TenMonHoc);
            }

            if (updateTinChi === '') {
                setUpdateTinChi(data[i].TinChi);
            }

            if (updateMaNganh === '') {
                setUpdateMaNganh(data[i].MaNganh);
            }

            if (updateTenNganh === '') {
                setUpdateTenNganh(data[i].TenNganh);
            }

            if (updateHsTx1 === -1) {
                setUpdateHsTx1(data[i].HsTx1);
            }

            if (updateHsTx2 === -1) {
                setUpdateHsTx2(data[i].HsTx2);
            }

            if (updateHsGiuaKy === -1) {
                setUpdateHsGiuaKy(data[i].HsGiuaKy);
            }

            if (updateHsCuoiKy === -1) {
                setUpdateHsCuoiKy(data[i].HsCuoiKy);
            }

            // console.log(MaMonHoc, updateTenMonHoc, updateTinChi, updateMaNganh, updateTenNganh, updateHsTx1, updateHsTx2, updateHsGiuaKy, updateHsCuoiKy);


            let response = await axios.post('http://localhost:8000/update_subject', { MaMonHoc, updateTenMonHoc, updateTinChi, updateMaNganh, updateTenNganh, updateHsTx1, updateHsTx2, updateHsGiuaKy, updateHsCuoiKy });
            window.alert('Sửa thành công!')
            window.location.reload()
        } catch (error) {
            console.log(error);
            window.alert('Không thể sửa!')
        }
    }

    useEffect(() => {
        const list = async () => {
            try {
                let response = await axios.post('http://localhost:8000/list_subject');
                // console.log(response.data.resData);
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
                    <p
                        style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px' }}
                    >Nhập thông tin môn học mới</p>
                    <div className={style["box1"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã môn học mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập mã môn học"
                            // value={ma}
                            onChange={(e) => setMa(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tên môn học mới*</p>
                        <input
                            type="text"
                            placeholder="Nhập tên môn học"
                            // value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập số tín chỉ*</p>
                        <input
                            type="number"
                            placeholder="Nhập số tín chỉ"
                            // value={tinChi}
                            onChange={(e) => setTinChi(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tên ngành*</p>
                        <input
                            type="text"
                            placeholder="Nhập tên ngành"
                            // value={tenN}
                            onChange={(e) => setTenN(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã ngành*</p>
                        <input
                            type="text"
                            placeholder="Nhập mã ngành"
                            // value={nganh}
                            onChange={(e) => setNganh(e.target.value)}
                        />
                    </div>
                    <div className={style["box2"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập hệ số điểm tx1*</p>
                        <input
                            type="number"
                            placeholder="Nhập hệ số tx1"
                            // value={tx1}
                            onChange={(e) => setTx1(Number(e.target.value))}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập hệ số điểm tx2*</p>
                        <input
                            type="number"
                            placeholder="Nhập hệ số tx2"
                            // value={tx2}
                            onChange={(e) => setTx2(Number(e.target.value))}
                        />
                    </div>
                    <div className={style["box3"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập hệ số điểm giữa kỳ*</p>
                        <input
                            type="number"
                            placeholder="Nhập hệ số giữa kỳ"
                            // value={giuaKy}
                            onChange={(e) => setGiuaKy(Number(e.target.value))}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập hệ số điểm cuối kỳ*</p>
                        <input
                            type="number"
                            placeholder="Nhập hệ số cuối kỳ"
                            // value={cuoiKy}
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
                            <tr key={i} className={style['myTr']}>
                                <td>{subject.MaMonHoc}</td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.TenMonHoc}
                                        className={style['this']}
                                        onChange={(e) => setUpdateTenMonHoc(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.TinChi}
                                        onChange={(e) => setUpdateTinChi(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.MaNganh}
                                        onChange={(e) => setUpdateMaNganh(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.TenNganh}
                                        className={style['this']}
                                        onChange={(e) => setUpdateTenNganh(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.HsTx1}
                                        onChange={(e) => setUpdateHsTx1(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.HsTx2}
                                        onChange={(e) => setUpdateHsTx2(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.HsGiuaKy}
                                        onChange={(e) => setUpdateHsGiuaKy(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder={subject.HsCuoiKy}
                                        onChange={(e) => setUpdateHsCuoiKy(e.target.value)}
                                    />
                                </td>

                                <td><button onClick={() => handleUpdate(subject.MaMonHoc, i)}>Sửa môn học</button></td>
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