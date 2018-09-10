import React from 'react';
import Classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className={Classes.NavigationItem}>
            <NavLink exact={props.exact} to={props.link} activeClassName={Classes.active}>{props.children}</NavLink>
        </li>
    );
};

export default NavigationItem;