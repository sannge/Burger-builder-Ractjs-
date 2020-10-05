import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Toggler from './Toggler/Toggler'
const Toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <Toggler showing={props.showing} showSideDrawer={props.showSideDrawer}/>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
}
export default Toolbar