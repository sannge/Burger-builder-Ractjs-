
import React,{useEffect,useState} from 'react'
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop'

function Modal(props) {
    
  
    useEffect(
        ()=>{
            
        },[props.show]
    )
    
    return (
        <>
        <Backdrop show={props.show} />
        <div  onClick={props.modalClosed} className={classes.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}
        >
            {props.children}
        </div>
        </>
    )
}

export default React.memo(Modal,(props,nextProps) => {
    if(props.show === nextProps.show){
        return false;
    }
})
// export default Modal;