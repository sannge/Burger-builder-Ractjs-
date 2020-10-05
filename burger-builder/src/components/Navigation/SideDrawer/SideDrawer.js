import React,{useState,useEffect} from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
function SideDrawer(props) {
    // const [backDropok, setbackDropok] = useState(true);

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses =[classes.SideDrawer, classes.Open];
    }

    return (
        <>
        {props.backdropShow ? <Backdrop show={props.open} clicked={props.closed}/> : null }
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
            <i onClick={props.closed} className="fas fa-times"></i>
            <Logo />
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </>
    )
}

export default SideDrawer
