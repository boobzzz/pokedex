import React from 'react';

const Button = props => {
    return (
        <button
            type="button"
            style={{ cursor: 'pointer', marginRight: '5px' }}
            onClick={props.clicked}>
            {props.page}
        </button>
    )
}

export default Button;
