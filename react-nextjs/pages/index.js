import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

// const indexPage = () => (
//     <>
//         <h1>The Main Page</h1>
//         <p>Go to 
//             <Link href="/auth">
//                 <a>Auth</a>
//             </Link>
//             <button onClick={() => Router.push('/auth')}>Go to Auth</button>
//         </p>
//     </>
// )

class indexPage extends Component {

    // ! It execute for initialize data from server or database
    static async getInitialProps(context){
        console.log(context)
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ appName: 'Super App'})
            }, 1000);
        })
        return promise
    }

    render(){
        return (
            <>
                <h1>The Main Page of {this.props.appName}</h1>
                <p>Go to 
                    {/* <Link href="/auth">
                        <a>Auth</a>
                    </Link> */}
                    <button onClick={() => Router.push('/auth')}>Go to Auth</button>
                </p>
            </>
        )
    }
}

export default indexPage