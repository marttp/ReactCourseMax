import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import Classes from './Logo.css';
const Logo = (props) => {
    return (
        <div className={Classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="Burger Logo"/>
        </div>
    );
};

export default Logo