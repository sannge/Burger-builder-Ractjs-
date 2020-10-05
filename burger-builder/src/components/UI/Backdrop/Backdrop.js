import classes,{useEffect} from './Backdrop.module.css'
import React from 'react'

function Backdrop(props) {
   
 
    return (
        <>
           {props.show ? 
            <div  onClick={props.clicked} className={classes.Backdrop}>
            </div>  
            : null 
        }
        </>
    )
}

export default Backdrop
