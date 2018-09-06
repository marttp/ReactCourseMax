import React from 'react';
import Classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Salad', type: 'salad'},
]

const BuildControls = (props) => {
    return (
        <div className={Classes.BuildControls}>
            <p>Current Price : <strong>{props.prices.toFixed(2)} $</strong></p>
            { controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    //Receive from parent and send argument to reference
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    //recieve props and filter by type
                    // T or F
                    disabled={props.disabled[ctrl.type]}/>
            ))}
            <button 
                className={Classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>
                ORDER NOW
            </button>
        </div>
    );
};

export default BuildControls;