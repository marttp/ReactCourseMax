import React from 'react'

import Classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>  {

    let transformedIngredients = 
    //Get all key from JSON by map 
        Object.keys(props.ingredients).map((ingredientKey) => {
            //separate value each key then map and return new array of ingredient
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
            })
        })
        .reduce((prevValue, currentValue) => {
            return prevValue.concat(currentValue)
        }, [])
    
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredient</p>
    }
    

    
    return (
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;