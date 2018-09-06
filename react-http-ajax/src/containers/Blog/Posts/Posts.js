import React, { Component } from 'react';
import Axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
//Use link for querying params from url
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount(){
        console.log(this.props)
        Axios.get('/posts')
        .then(response => {
            //transform data
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Mart'
                }
            })
            this.setState({ posts: updatedPosts });
            // console.log(response)
        })
        .catch(error => {
            console.log(error)
            // this.setState({ error: true })
        })
    }

    postSelectedHandler = (id) => {
        // this.setState({ selectedPostId: id })
        // this.props.history.push({ pathName: '/posts/' + id})
        this.props.history.push('/posts/'+id);
    }

    render() {

        let posts = <p style={{ textAlign:'center' }}>Something went wrong!</p>;
        
        if(!this.state.error){
            posts = this.state.posts.map((post) => {
                return (
                    // Add 20180910
                    // <Link to={'/posts/'+post.id} key={post.id} >
                        // {/*Add 20180907*/}
                        <Post 
                            title={post.title} 
                            key={post.id}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}/>
                    // </Link>
                );
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+"/:id"} exact component={FullPost}/>
            </div>
        );
    }
}

export default Posts;