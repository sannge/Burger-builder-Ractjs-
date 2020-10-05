import React from 'react'
import classes from './Toggler.module.css'
function Toggler(props) {
    return (
        <div className={[classes.Toggler, props.showing? classes.sidebarOpened : null].join(' ')}>

            <i onClick={props.showSideDrawer} className={ 'fas fa-bars'}></i>
        </div>
    )
}

export default Toggler
