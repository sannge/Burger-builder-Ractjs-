import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad: 0.50,
    cheese: 0.40,
    meat: 1.30,
    bacon: 0.70
}
class BurgerBuilder extends Component {
    state= {
        ingredient:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
        ,totalPrice: 4.00,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseable = (ingredientUpdated) => {
        const ingredient = {
            ...ingredientUpdated
        }
        const sum = Object.keys(ingredient).map((key)=>{
            return ingredient[key];
        })
        .reduce((accumulator,currentVal)=>{
            return accumulator + currentVal;
        },0)

        if(sum > 0){
            this.setState({purchaseable : true})
        }
        else{
            this.setState({purchaseable : false})
        }
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredient};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({ingredient: updatedIngredients,totalPrice: newPrice})
        this.updatePurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        if (oldCount <= 0) 
                return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredient};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        
        this.setState({ingredient: updatedIngredients,totalPrice: newPrice})
        this.updatePurchaseable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    closeModal = () => {
        this.setState({purchasing: false})
    }

    continueHandler = () => {
        alert("You Continue!");
        this.setState({purchasing: false})
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
       
        return (
            <>
                
                  <Burger ingre ={this.state.ingredient}/>
    
                <Modal show={this.state.purchasing} modalClosed={this.closeModal}>
                    <OrderSummary price={this.state.totalPrice} cancel={this.closeModal} continue={this.continueHandler} ingredient={this.state.ingredient}/>
                </Modal> 
                
                  
                  <BuildControls 
                  ordered={this.purchaseHandler}
                  purchaseable={this.state.purchaseable}
                  price={this.state.totalPrice}
                   disabled={disabledInfo} 
                   ingredientRemoved={this.removeIngredientHandler} 
                   ingredientAdded={this.addIngredientHandler}/>
                

              
            </>
        )
    }
}

export default BurgerBuilder;
