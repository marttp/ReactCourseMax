import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilieary'
import Button from '../../UI/Button/Button';

export default class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('[OrderSummary] componentWillUpdate()')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingredientKey => {
            return (
                <li key={ingredientKey}>
                    <span style={{ textTransform: 'capitalize'}}>
                        {ingredientKey}
                    </span> : {this.props.ingredients[ingredientKey]}
                </li>
            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <h3>A delicious burger with the following ingredient :</h3>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCLE</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
};