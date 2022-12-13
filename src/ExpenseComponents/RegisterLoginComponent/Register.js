import React,{useState} from "react";
import validator from 'validator'
import { RegisterForm } from "../../redux/actions/registerAction";
import '../../CSS/register.css'
const Register=(props)=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [occupation,setOccupation]=useState('')
    const [error,setError]=useState({})
    const errors={}

    const handleFormChange=(e)=>{
        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
        else if (e.target.name ==='occupation'){
            setOccupation(e.target.value)
        }
    }

    const ValidateForm=()=>{
        if(validator.isEmpty(name)){
            errors.name= `Name can't be Empty `
        }
        if(!validator.isEmail(email)){
            errors.email=`invalid Email Format`
        }
        if(validator.isEmpty(email)){
            errors.email=`Email can't be Empty`
        }
        if(validator.isEmpty(password)){
            errors.password=`password must be strong`
        }
        if(validator.isEmpty(occupation)){
            errors.occupation=`Occupation can't be Empty`
        }
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        ValidateForm()
        setError(errors)
        if(Object.keys(errors).length === 0){
            const registerData={
                email:email,
                password:password,
                profile:{
                    name:name,
                    occupation:occupation
                }
            }
            const redirect=()=>{
                props.history.push('/login')
            }
             RegisterForm(registerData,redirect)
        }
    }

    return(
        <div className="register">
          
            <form onSubmit={handleFormSubmit}><br/>
                <input type='text' placeholder="Enter Your Name" value={name} name="name"
                 onChange={handleFormChange} /><br/>
                 {error.name && <span>{error.name}</span>}<br/>
                <input type='text' placeholder="Enter Your Email" value={email} 
                 name="email" onChange={handleFormChange} /><br/>
                 {error.email && <span>{error.email}</span>}<br/>
                <input type='password' placeholder="Enter Your Password" value={password}
                 name="password" onChange={handleFormChange} /><br/>
                  {error.password && <span>{error.password}</span>}<br/>
                <input type='text' placeholder="Enter Your Occupation" value={occupation} 
                name="occupation" onChange={handleFormChange} /><br/>
                 {error.occupation && <span>{error.occupation}</span>}
                <input type='Submit' defaultValue='Register' />
            </form>
        </div>
    )
}

export default Register