import React from 'react';
import classes from './PizzaImage.css'

import PizzaImages from '../../assets/pizza.jpg'

const PizzaImage = (props) => (
    <div className={classes.PizzaImage}>
        <img src={PizzaImages} className={classes.PizzaImg} />
    </div>
);

export default PizzaImage;