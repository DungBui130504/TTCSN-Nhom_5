import { React, useEffect, useState, useRef } from "react";
import '../css/button.css'
import redboy from '../../../images/redboy.gif'
import { useNavigate } from 'react-router-dom';

let check = false;

function go4() {
    const submit = document.getElementById('submit')
    const wrapper = document.getElementById('wrapper')
    const action = document.createElement('div')

    const arr = [redboy]

    action.style.background = `url('${arr[0]}')`;
    action.style.backgroundSize = "contain";
    action.style.backgroundRepeat = "no-repeat";
    action.style.height = "90px";
    action.style.width = "100px";
    action.style.position = "absolute";
    action.style.transform = "rotate(360deg)";

    action.style.left = '10px'
    action.style.top = "670px";
    action.style.opacity = "0.5";
    action.style.marginTop = "11px";

    wrapper.appendChild(action)

    submit.style.marginTop = '50px'
    submit.style.boxShadow = 'none'

    setTimeout(() => {
        action.style.left = '1410px'
        action.style.transition = '10s'
        action.style.opacity = '1'
    }, 500)

    setTimeout(() => {
        action.style.opacity = '0'
        action.style.transition = '0s'
        action.style.left = '10px'
    }, 8500)

    setTimeout(() => {
        submit.style.marginTop = '35px'
        submit.style.boxShadow = '10px 10px 5px 1px rgb(110, 105, 105)'
    }, 500)

}


function Button() {

    return (
        <input type="submit" value="Đăng nhập" id="submit" onClick={go4} />
    )
}

export default Button;