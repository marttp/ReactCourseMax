import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        isLoading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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

        axios.post('/orders.json',order).then(response => {
            console.log(response)
            this.setState({ isLoading: false })
            this.props.history.push('/');
        }).catch(error => {
            console.log(error)
            this.setState({ isLoading: false })
        })
    }

    render() {
        let form = (
            <form>
                <input className={Classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={Classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={Classes.Input} type="text" name="street" placeholder="Street" />
                <input className={Classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>

        );

        if(this.state.isLoading){
            form = <Spinner />
        }
        return (
            <div className={Classes.ContactData}>
                <h4>Enter your Contract data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;