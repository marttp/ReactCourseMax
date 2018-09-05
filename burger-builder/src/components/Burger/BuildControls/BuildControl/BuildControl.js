import React from 'react';

import Classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={Classes.BuildControl}>
            <div className={Classes.Label}>{props.label}</div>

            <button 
                disabled={props.disabled}
                className={Classes.Less}
                //Active event from parent
                onClick={props.removed}>
                Less
            </button>

            <button 
                className={Classes.More}
                //Active event from parent
                onClick={props.added}>
                More
            </button>
        </div>
    );
};

export default buildControl;