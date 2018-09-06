import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData(){
        // const query = new URLSearchParams(this.props.location.search);
        // for (let param of query.entries()) {
        //     console.log(param); // yields ['start', '5']
        // }
        // if(this.props.id){
        if(this.props.match.params.id){
            if(!this.state.loadedPost || this.state.loadedPost.id !== +this.props.match.params.id){
                Axios.get('/posts/'+this.props.match.params.id)
                .then(response => {
                    // console.log(response);
                    this.setState({ loadedPost: response.data })
                });            
            }
        }
    }

    deletePostHandler = () => {
        Axios.delete('/posts/'+ this.props.match.params.id)
        .then(response => {
            console.log(response);
        })
    }

    render () {
        let post = <p style={{ textAlign:'center' }}>Please select a Post!</p>;
        
        if(this.props.match.params.id){
            post = <p style={{ textAlign:'center' }}>Loading...!</p>;
        }

        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;