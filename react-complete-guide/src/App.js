import React, { Component } from "react";

import "./App.css";

import UserOutput from './UserOutput/UserOutput'
import UserInput from './UserInput/UserInput'

class App extends Component {

  state = {
    username : [
      'firstInitial',
      'secondInitial',
      'thirdInitial',
    ]
  }

  usernameChangeHandler = (event,index) => {
    const text = event.target.value
    let changedUsername = this.state.username
    changedUsername[index] = text
    this.setState(prevState => ({
      ...prevState,
      username: changedUsername
    }));
  }


  render() {

    return (
      <div className="App">
        <UserOutput username={this.state.username[0]}/>
        <UserInput changed={(text) => this.usernameChangeHandler(text,0)}/>

        <UserOutput username={this.state.username[1]}/>
        <UserInput changed={(text) => this.usernameChangeHandler(text,1)}/>

        <UserOutput username={this.state.username[2]}/>
        <UserInput changed={(text) => this.usernameChangeHandler(text,2)}/>
      </div>
    );
  }
}

export default App;
