import React, { useState } from 'react';
import './NumberBox.css'

const NumberBox = props => {


    return (

        <button onClick={() => console.log('num', props.displayNum)}
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