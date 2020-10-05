import React from 'react';
import './Burger.module.css';
import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';
function Burger(props) {
    const transformedIngredients = Object.keys(props.ingre)
    .map((igKey)=>{
        return [...Array(props.ingre[igKey])].map(
            (_,i)=>{
                return <Ingredient key={igKey + i} type={igKey}/>
            }
        );
    })
    .reduce((accumulator,currentVal) => {
       
        return accumulator.concat(currentVal)
    },[])

    
    
    console.log(transformedIngredients)

    return (
   
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients.length >= 1 ? transformedIngredients : <p>Please add the ingredients!</p>}
            <Ingredient type="bread-bottom"/>
        </div>
   
    )
}

export default Burger

