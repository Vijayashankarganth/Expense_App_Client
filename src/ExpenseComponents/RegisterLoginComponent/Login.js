import React,{useState} from "react";
import swal from "sweetalert";
import validator from 'validator'
import { LoginForm } from "../../redux/actions/registerAction";
import '../../CSS/login.css'

const Login =(props)=>{
    const {logChecker}=props
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState({})

    const errors={}
    const handleFormChange=(e)=>{
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }
    const validateForm=()=>{
        if(!validator.isEmail(email)){
            errors.email=`Invalid Email Format `
        }
        if(validator.isEmpty(email)){
            errors.email=`Email can't be Empty `
        }
        if(validator.isEmpty(password)){
            errors.password=`password can't be Empty`
        }
    }

    const handleSubmit=(e)=>{
            e.preventDefault()
            validateForm()
            setError(errors)
            if(Object.keys(errors).length === 0){
                const loginData={
                    email:email,
                    password:password
                }
                const redirect=()=>{
                    swal({title: "You are successfully logged in",
                          icon: "success",
                          buttons: 'Done'})
                    props.history.push('/Home')
                }
                LoginForm(loginData,logChecker,redirect)
            }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}><br/><br/>
                <input type='text' placeholder="Enter Your Email" value={email} 
                name="email" onChange={handleFormChange} /><br/>
                {error.email && <span>{error.email}</span>}<br/>
                <input type='password' placeholder="Enter Password" value=
                {password} name="password" onChange={handleFormChange} /><br/>
                  {error.password && <span>{error.password}</span>}
                <input type='Submit' defaultValue='login'  />
            </form>
            
          
        </div>
        
    )
}

export default Login