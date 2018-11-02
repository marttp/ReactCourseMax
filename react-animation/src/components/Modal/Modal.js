import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

const animationsTiming = {
    enter: 400,
    exit: 400
}

const modal = (props) => {

    return (
        <CSSTransition in={props.show}
            timeout={animationsTiming}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: '',
                enterActive: 'ModalOpen',
                exit: '',
                exitActive: 'ModalClosed'
            }}
        >
        {/* 
            // Use this in Transition
            {
            state => {
                const cssClasses = ['Modal', 
                    state === 'entering' ? 'ModalOpen' : 
                    state === 'exiting' ? 'ModalClosed' : null
                ]
                return (
                    <div className={cssClasses.join(' ')}>
                        <h1>A Modal</h1>
                        <button className="Button" onClick={props.closed}>Dismiss</button>
                    </div>
                )
            }
        } */}
        <div className='Modal'>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
      </CSSTransition>
    )
}

export default modal;