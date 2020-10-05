import React,{Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class Layout extends Component  {
    state = {
        showSideDrawer : false,
        sideDrawerBackdropShow: true
        
    }

    componentDidMount(){
        window.addEventListener('resize',this.eliminateSideDrawerBackdrop)
        console.log("didmount called")
    }
    componentDidUpdate(){
        window.addEventListener('resize',this.eliminateSideDrawerBackdrop)
        console.log("didupdate called")
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.eliminateSideDrawerBackdrop)
        console.log("unmount called!")
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return{
                    showSideDrawer: !prevState.showSideDrawer
                };
            
        })
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    eliminateSideDrawerBackdrop = () => {
        if(window.innerWidth > 499){
            this.setState({sideDrawerBackdropShow:false})
        }else{
            this.setState({sideDrawerBackdropShow:true})
        }
    }

    render(){
        
        
    return(
        <>
            
            <Toolbar showing={this.state.showSideDrawer} showSideDrawer={this.sideDrawerToggleHandler}/>
            <SideDrawer backdropShow={this.state.sideDrawerBackdropShow} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            
        </>
    );
}
}
export default Layout;