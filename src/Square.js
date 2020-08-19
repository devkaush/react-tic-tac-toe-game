import React from 'react'

export default function Square({ value , onClick}) {
    function handleOnclick(){
        onClick()
    }
    return (
        <button className="square" onClick={handleOnclick}>
            {value}
        </button>
    )
}
