import React, { Component } from 'react'
import Aux from '../../hoc/Auxilieary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axois from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        isLoading: false,
        error: false
    }

    componentDidMount(){
        axois.get('/ingredients.json').then(response => {
            this.setState({ ingredients: response.data})
        }).catch(error => {
            this.setState({ error: true })
        })
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map(ingredientKey => {
            //create array from ingredients by key
            return ingredients[ingredientKey];
        }).reduce((sum, element) => {
            return sum + element;
        },0)
        this.setState({ purchasable: sum > 0 })
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert('You continue')
        this.setState({ isLoading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Thanaphoom Babparn',
                address: {
                    province: 'Pathumthani',
                    zipCode: '12110',
                    country: 'Thailand',
                },
                email: 'thanaphoom@mail.com'
            },
            deliveryMethod: 'fastest'
        }

        axois.post('/orders.json',order).then(response => {
            console.log(response)
            this.setState({ isLoading: false, purchasing: false })
        }).catch(error => {
            console.log(error)
            this.setState({ isLoading: false, purchasing: false })
        })
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

        let orderSummary = null

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be load</p>: <Spinner />

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        //Pass reference of function to child
                        prices={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        //send object by props
                        disabled={disabledInfo}/>
                </Aux>
            );

            orderSummary = (
                <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler}
                price={this.state.totalPrice}/>
            );
        }

        
        if(this.state.isLoading){
            orderSummary = <Spinner />;
        }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axois);