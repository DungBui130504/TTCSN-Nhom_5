import React, { useState, useEffect } from "react";
import style from './ManageClass.module.css'
import axios from "axios";

function ManageClass() {
    const [ma, setMa] = useState('')
    const [ten, setTen] = useState('')
    const [start, setStart] = useState('')
    const [time, setTime] = useState(0)
    const [day, setDay] = useState('')
    const [data, setData] = useState([])
    const [check, setCheck] = useState(false);
    const [newId, setNewId] = useState('')
    const [thu1, setThu1] = useState('')
    const [thu2, setThu2] = useState('')
    const [tg, setTg] = useState(0)
    const [mon, setMon] = useState('')
    const [gv, setGv] = useState('')

    const handleAdding = async () => {
        try {
            if (ma == '' || ten == '' || start == '' || time == '0' || day == '') {
                window.alert('Phải nhập đầy đủ thông tin lớp học!')
                return
            }
            if (time !== 1 && time !== 2 && time !== 3) {
                window.alert('Chỉ được nhập 1 trong 3 giá trị 1, 2 hoặc 3 đối với thời gian thi')
                return
            }

            let response = await axios.post('http://localhost:8000/add_class', { ma, ten, start, time, day });
            // console.log(response.data);
            setCheck(!check);
            window.alert('Thêm thành công!');
        }
        catch (err) {
            console.log(err);
            window.alert('Thêm không thành công');
        }
    };

    const handleDel = async (MaLop, i) => {
        try {
            if (data[i].SoLuongSinhVien > 0) {
                window.alert('Lớp đang có sinh viên học, không thể xóa!')
                return
            }
            let response = await axios.post('http://localhost:8000/del_class', { id: MaLop });
            // console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi xóa
            window.alert('Xóa thành công!')
        }
        catch (err) {
            console.log(err);
            window.alert('Xóa không thành công');
        }
    };

    const handleUpdate = async (MaLop, MaNganh) => {
        try {
            if (MaNganh == null) {
                window.alert('Lớp chưa thuộc ngành nào!')
                return
            }
            let response = await axios.post('http://localhost:8000/update_class', { newId, MaLop, MaNganh });
            window.alert('Cập nhật thành công')
            window.location.reload()
        } catch (error) {
            console.log(error);
            window.alert('Không thể cập nhật')
        }
    }

    const handleMark = (MaLop, TenLop, MaNganh) => {
        localStorage.setItem('MaLop', MaLop)
        localStorage.setItem('TenLop', TenLop)
        localStorage.setItem('MaNganh', MaNganh)
    }

    const handleUpdate2 = async () => {
        try {
            let MaLop = localStorage.getItem('MaLop')
            let TenLop = localStorage.getItem('TenLop')
            let MaNganh = localStorage.getItem('MaNganh')
            if (MaLop == '' || TenLop == '' || MaNganh == '' || mon == '' || gv == '' || tg == 0) {
                window.alert('Phải nhập đủ thông tin!')
                return
            }
            if (thu1 > thu2 || thu1 === thu2) {
                window.alert('Thứ học 1 phải lớn hơn thứ học 2 , và phải khác nhau!')
                return
            }
            if (thu1 == '' && thu2 == '') {
                window.alert('Phải nhập ít nhất 1 thứ học trong tuần!')
                return
            }
            if (tg != 1 && tg != 2 && tg != 3) {
                window.alert('Thời gian học chỉ nhập 1, 2 hoặc 3')
                return
            }
            let response = await axios.post('http://localhost:8000/update_class2', { TenLop, MaLop, MaNganh, mon, gv, tg, thu1, thu2 });
            console.log(response);
            window.alert('Cập nhật thành công')
        } catch (error) {
            console.log(error);
            window.alert('Không thành công!')
        }
    }

    useEffect(() => {
        const list = async () => {
            try {
                let response = await axios.post('http://localhost:8000/list_class');
                // console.log(response.data.resData);
                setData(response.data.resData);
            } catch (err) {
                console.log(err);
                window.alert('Lấy danh sách không thành công');
            }
        };

        list();
    }, [check]);

    function convertTime(number) {
        if (number === 1) {
            return 'Sáng'
        }
        if (number === 2) {
            return 'Chiều'
        }
        if (number === 3) {
            return 'Tối'
        }
    }

    return (
        <div className={style["teacher-container"]}>
            <div className={style["add-container"]} id='here7'>
                <div className={style["input"]}>
                    <p
                        style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px' }}
                    >Nhập thông tin lớp học mới</p>
                    <div className={style["box1"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã lớp học*</p>
                        <input
                            type="text"
                            placeholder="Nhập mã lớp học mới"
                            // value={ma}
                            onChange={(e) => setMa(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập tên lớp học*</p>
                        <input
                            type="text"
                            placeholder="Nhập tên lớp học mới"
                            // value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />

                    </div>
                    <div className={style["box2"]}>
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập thời gian bắt đầu*</p>
                        <input
                            type="text"
                            placeholder="Nhập thời gian bắt đầu"
                            // value={tg}
                            onChange={(e) => setStart(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập ngày thi dự kiến*</p>
                        <input
                            type="text"
                            placeholder="Nhập ngày thi"
                            // value={tg}
                            onChange={(e) => setDay(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập thời gian dự kiến thi*</p>
                        <input
                            type="number"
                            placeholder="Nhập thời gian thi: 1-Sáng ; 2-Chiều ; 3-Tối"
                            // value={tg}
                            onChange={(e) => setTime(Number(e.target.value))}
                        />
                    </div>
                    <button className={style['add']} onClick={handleAdding}>Thêm lớp học</button>
                </div>
            </div>
            <div className={style["list-container"]} id='here8'>
                <table
                    style={{
                        borderCollapse: 'collapse', width: '150%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
                    }}
                >
                    <thead>
                        <tr>
                            <th>Mã Lớp</th>
                            <th>Tên Lớp</th>
                            <th>Thời Gian Bắt Đầu</th>
                            <th>Số lượng sinh viên</th>
                            {/* <th>Giảng viên</th> */}
                            <th>Ngày Thi Dự Kiến</th>
                            <th>Thời Gian Dự Kiến Thi</th>
                            <th colSpan={2}>Thêm sinh viên</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...data]
                            .sort((a, b) => a.MaLop.localeCompare(b.MaLop)) // Sắp xếp tăng dần theo MaLop
                            .map((Class, i) => (
                                <tr key={i}>
                                    <td>{Class.MaLop}</td>
                                    <td>{Class.TenLop}</td>
                                    <td>{Class.ThoiGianBatDau}</td>
                                    <td>{Class.SoLuongSinhVien > -1 ? Class.SoLuongSinhVien : '-'}</td>
                                    {/* <td>{Class.TenGiangVien ? Class.TenGiangVien : '-'}</td> */}
                                    <td>{Class.NgayThi}</td>
                                    <td>{convertTime(Class.ThoiGianThi)}</td>
                                    <td style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            placeholder="Nhập mã sinh viên mới"
                                            onChange={(e) => setNewId(e.target.value)}
                                            style={{ color: 'black', position: 'absolute', left: '2px', top: '10px' }}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(Class.MaLop, Class.MaNganh)} className={style['update-btn']}>
                                            Thêm sinh viên
                                        </button>
                                    </td>
                                    <td><button className={style['update2-btn']}><a href="#here9" className={style["update-mark"]} onClick={() => handleMark(Class.MaLop, Class.TenLop, Class.MaNganh)}>Cập nhật lớp này</a></button></td>
                                    <td>
                                        <button onClick={() => handleDel(Class.MaLop, i)} className={style["del-btn"]}>
                                            Xóa lớp học
                                        </button>
                                    </td>
                                </tr>
                            ))}

                    </tbody>
                </table>
            </div>
            <div className={style['update-container']} id="here9">
                <p
                    style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px', color: 'black' }}
                >Nhập thông cập nhật lớp học</p>
                <div className={style["box1"]} style={{ marginTop: '-20px', marginLeft: '50px' }}>
                    <p style={{ marginBottom: '10px', color: 'red' }}>Nhập thứ học 1*</p>
                    <input
                        type="text"
                        placeholder="Nhập thứ học 1"
                        // value={ma}
                        onChange={(e) => setThu1(e.target.value)}
                    />
                    <p style={{ marginBottom: '10px', color: 'red' }}>Nhập thứ học 2*</p>
                    <input
                        type="text"
                        placeholder="Nhập thứ học 2"
                        // value={ten}
                        onChange={(e) => setThu2(e.target.value)}
                    />

                </div>
                <div className={style["box2"]} style={{ marginTop: '-75px' }}>
                    <p style={{ marginBottom: '10px', color: 'red' }}>Nhập thời gian học*</p>
                    <input
                        type="number"
                        placeholder="1-Sáng ; 2-Chiều ; 3-Tối"
                        // value={tg}
                        onChange={(e) => setTg(Number(e.target.value))}
                    />
                    <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã môn học*</p>
                    <input
                        type="text"
                        placeholder="Nhập mã môn học"
                        // value={tg}
                        onChange={(e) => setMon(e.target.value)}
                    />
                    <p style={{ marginBottom: '10px', color: 'red' }}>Nhập mã giảng viên*</p>
                    <input
                        type="text"
                        placeholder="Nhập mã giảng viên"
                        // value={tg}
                        onChange={(e) => setGv(e.target.value)}
                    />
                </div>
                <button className={style['add']} onClick={handleUpdate2} style={{ position: 'absolute', bottom: '200px', left: '470px' }}>Cập nhật</button>
            </div>
        </div>
    )
}

export default ManageClass;