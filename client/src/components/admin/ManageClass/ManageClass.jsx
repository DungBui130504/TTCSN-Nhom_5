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

    const handleDel = async (MaLop) => {
        try {
            let response = await axios.post('http://localhost:8000/del_class', { id: MaLop });
            console.log(response.data);
            setCheck(!check); // Cập nhật lại danh sách sau khi xóa
            window.alert('Xóa thành công!')
        }
        catch (err) {
            console.log(err);
            window.alert('Xóa không thành công');
        }
    };

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
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập ngày thi*</p>
                        <input
                            type="text"
                            placeholder="Nhập ngày thi"
                            // value={tg}
                            onChange={(e) => setDay(e.target.value)}
                        />
                        <p style={{ marginBottom: '10px', color: 'red' }}>Nhập thời gian thi*</p>
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
                        borderCollapse: 'collapse', width: '100%', textAlign: 'center', marginTop: '20px', backgroundColor: 'white', borderLeft: '1px solid black'
                    }}
                >
                    <thead>
                        <tr>
                            <th>Mã Lớp</th>
                            <th>Tên Lớp</th>
                            <th>Thời Gian Bắt Đầu</th>
                            <th>Ngày Thi</th>
                            <th>Thời Gian Thi</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((Class, i) => (
                            <tr key={i}>
                                <td>{Class.MaLop}</td>
                                <td>{Class.TenLop}</td>
                                <td>{Class.ThoiGianBatDau}</td>
                                <td>{Class.NgayThi}</td>
                                <td>{convertTime(Class.ThoiGianThi)}</td>
                                <td><button onClick={() => handleDel(Class.MaLop)}>Xóa lớp học</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageClass;