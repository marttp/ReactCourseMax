import React, {Component} from 'react'
import Aux from '../../hoc/Auxilieary'
import Classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { 
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}