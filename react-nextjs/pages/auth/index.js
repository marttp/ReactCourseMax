import React from 'react'
import User from '../../components/User';


const authIndexPage = (props) => (
    <>
        <h1>The AuthIndex Page - {props.appName}</h1>
        <User name="Mart" age={22}/>
    </>
)

authIndexPage.getInitialProps = async(context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ appName: 'Super App (Auth)'})
        }, 1000);
    })
    return promise
}

export default authIndexPage