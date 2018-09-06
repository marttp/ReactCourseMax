import React, { Component } from 'react';

import './Blog.css';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// create asyncComponent for make lazily loading
import asyncComponent from '../../hoc/asyncComponent';
import Posts from './Posts/Posts';
// import FullPost from './FullPost/FullPost';
// import NewPost from './NewPost/NewPost';


// Use this step for make lazy component
//////////////////////////////////////////////////
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});
//////////////////////////////////////////////////
// After that throw it to point of lazy in program


class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                    to="/posts/" 
                                    exact
                                    activeClassName="active"
                                    activeStyle={{
                                        color:'#FA923F',
                                        textDecoration: 'underline'
                                    }}
                                >Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* Add 20180910 
                * Switch use for load single route
                */}
                <Switch>
                    {/* { this.state.auth ? <Route path="/new-post" component={NewPost}/> : null} */}
                    { this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    {/* Dymamic Routing*/}
                    {/* <Route path="/posts/:id" exact component={FullPost}/> */}
                    {/* <Redirect from="/" to="/posts" /> */}
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
                {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;