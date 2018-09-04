import React from 'react'

const inputBox = (props) => {
    const inputSpace = {
        marginBottom: '30px',
    }
    
    return <input style={inputSpace} type="text" onChange={props.changed} value={props.username}/>
}

export default inputBox