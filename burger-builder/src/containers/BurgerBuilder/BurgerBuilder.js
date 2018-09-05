import React, { Component } from 'react'
import Aux from '../../hoc/Auxilieary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export default class BurgerBuilder extends Component {

    state = {
        ingredients: {
            bacon: 0,
            meat: 0,
            cheese: 0,
            salad: 0,
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //Fix immutable object
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState((prevState, props) => ({
            ...prevState,
            ingredients: updatedIngredients,
            totalPrice: newPrice
        }));
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        //Fix immutable object
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState((prevState, props) => ({
            ...prevState,
            ingredients: updatedIngredients,
            totalPrice: newPrice
        }));
    }

    render() {

        //Spread into new variable
        const disabledInfo = {
            ...this.state.ingredients
        };

        /*
        * loop check return like this
        * disabledInfo {
        *   salad: T,
        *   bacon: T,
        *   cheese: F,
        *   meat: F
        * }
        */
        for(let key in disabledInfo){
            // Can't use button when < 0 (true)
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    //Pass reference of function to child
                    prices={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    //send object by props
                    disabled={disabledInfo}/>
            </Aux>
        )
    }
}
