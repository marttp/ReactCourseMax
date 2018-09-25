import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={() => this.props.onAddFive(5)} />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractFive(5)} />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storeResult.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>
                            {strResult.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.count.counter,
        storeResult: state.result.results
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // use for props
        onIncrementCounter: () => {
            // use in each reducer
            dispatch({ type: actionTypes.INCREMENT})
        },
        onDecrementCounter: () => {
            dispatch({ type: actionTypes.DECREMENT})
        },
        onAddFive: (number) => {
            dispatch({ 
                type: actionTypes.ADD_5,
                payload: number
            })
        },        
        onSubtractFive: (number) => {
            dispatch({ 
                type: actionTypes.SUBTRACT_5,
                payload: number
            })
        },
        onStoreResult: (counter) => {
            dispatch({ 
                type: actionTypes.STORE_RESULT,
                payload: counter
            })
        },
        onDeleteResult: (id) => {
            dispatch({ 
                type: actionTypes.DELETE_RESULT,
                payload: id
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);