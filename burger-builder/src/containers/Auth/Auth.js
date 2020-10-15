import React,{Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            
        },
        isSignup: true
        
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.setAuthRedirectPath();
        }   
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }
    
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState =>{
            return {
                isSignup: ! prevState.isSignup
            }
        })
    }

    render(){
        const formElementsArray = []
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(e => {
            return (<Input
            key={e.id}
            elementType={e.config.elementType}
            elementConfig={e.config.elementConfig}
            value={e.config.value}
            invalid = {!e.config.valid}
            shouldValidate = {e.config.validation}
            touched = {e.config.touched}
            changed = {(event)=>this.inputChangedHandler(event,e.id)}           />
        )})
        
        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p style={{color: 'red',fontWeight:'bold'}}>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
          
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {this.state.isSignup ? <h3>SIGN UP</h3> : <h3>SIGN IN</h3>}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{

        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup)=> dispatch(actions.auth(email,password,isSignup)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);