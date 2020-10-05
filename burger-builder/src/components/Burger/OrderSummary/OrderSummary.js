import React from 'react'
import Button from '../../UI/Button/Button'
function OrderSummary(props) {
    const ingredientList =Object.keys(props.ingredient)
    .map(
        (key)=>{
            return(
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>
                    {key}: {props.ingredient[key]}
                </span>
            </li>
            )
        }
    )        
    
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientList}
            </ul>
            <p><strong>Total Price:  ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </>
    )
}

export default OrderSummary
