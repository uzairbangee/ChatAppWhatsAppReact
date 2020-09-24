import React from 'react'

function DateBox({time}) {
    return (
        <div className="date__area">
            <div className="date__box">
                <span className="date"> {time} </span>
            </div>
        </div>
    )
}

export default DateBox
