import React, { Component } from 'react';
import Classes from './Modal.css'
import Aux from '../../../hoc/Auxilieary';
import Backdrop from '../Backdrop/Backdrop';

export default class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props.show)
        // console.log(nextProps.show)
        // If props incoming from parent is different. Then updated it
        return nextProps.show !== this.props.show
    }

    componentWillUpdate(){
        console.log('[Modal] componentWillUpdate')
    }

    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={Classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1':'0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }

};
