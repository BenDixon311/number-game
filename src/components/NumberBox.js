import React, { useState } from 'react';
import './NumberBox.css'

const NumberBox = props => {


    return (

        <button onClick={() => props.onClick(props.displayNum, props.status)}
            className="number"
            style={{ backgroundColor: colors[props.status] }}
        >
            {props.displayNum}
        </button>

    )
}

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

export default NumberBox;