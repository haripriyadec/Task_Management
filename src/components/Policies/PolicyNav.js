import React from "react";

export default function PolicyNav(props){
    const change = num => props.setActive(num);
    return(
        <div className="policynav">
            <ul>
                <li className={props.active===1?"activeButton":"" + "listElements"}
                    onClick={()=>change(1)}>NDA</li>
                <li className={props.active===2?"activeButton":"" + "listElements"}
                    onClick={()=>change(2)}>IT</li>
                <li className={props.active===3?"activeButton":"" + "listElements"}
                    onClick={()=>change(3)}>HR</li>
            </ul>
        </div>
    );
}