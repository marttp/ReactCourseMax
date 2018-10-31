import React from 'react';

const User = (props) => {
    return (
        <>
            <h1>{props.name}</h1>
            <p>Age : {props.age}</p>

            <style jsx>{`
                div{
                    border: 1px solid #EEE;
                    box-shadow: 0 2p 3px #CCC;
                    padding: 20px;
                    text-align: center;
                }
            `}</style>
        </>
    );
};

export default User;

