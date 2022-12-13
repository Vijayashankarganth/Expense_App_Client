import axios from 'axios'
import swal from 'sweetalert'

export const RegisterForm=(registerData,redirect)=>{
        axios.post('http://localhost:4321/api/user/register',registerData)
             .then((response)=>{
                const result=response.data
                if(result.hasOwnProperty('error')){
                    swal('Oops','Already Register','error')
                }
                else{
                    swal('Thank You!','Successfully Registered','success')
                    redirect()
                }
                
             })

    
}

export const LoginForm=(loginData,logChecker,redirect)=>{
    axios.post('http://localhost:4321/api/user/login',loginData)
         .then((response)=>{
            const result=response.data
            if(result.hasOwnProperty('error')){
                swal('Oops',result.error,'error')
            }
            else{
                localStorage.setItem('token',result.token)
                logChecker()
                redirect()
            }
         })

}