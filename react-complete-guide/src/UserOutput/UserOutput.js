import React from 'react'

const outputBox = (props) => {

    const boxStyle = {
        backgroundColor: '#FBFBFB',
        width: '60%',
        height: '120px',
        margin: '16px auto',
        border: '1px solid #CCC',
        boxShadow: '0 2px 3px #CCC',
        padding: '16px',
        textAlign: 'center',
    }

    return (
        <div style={boxStyle}>
            <p>Username : {props.username}</p>
            <p>Make it two-way binding</p>
        </div>
    )
}

export default outputBox