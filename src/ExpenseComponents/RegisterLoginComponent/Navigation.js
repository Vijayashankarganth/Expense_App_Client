import React,{useState} from 'react'
import {Link,Route} from 'react-router-dom'
import swal from 'sweetalert'
import PrivateRouter from '../RegisterLoginComponent/PrivateRouter'
import Register from '../RegisterLoginComponent/Register'
import Login from '../RegisterLoginComponent/Login'
import Home from '../HomeComponents/Home'
import Settings from '../settingComponent/Settings'
import Profile from '../profileComponent/Profile'
import PrintTable from '../ExpenseDataPrint/PrintTable'

const Navigation=(props)=>{
         
        const [logedIn,setLogedIn]=useState(Boolean(localStorage.getItem('token')))

        const logChecker=()=>{
                setLogedIn(!logedIn)
        }
        const handleLogout=()=>{
            swal('success','Logged Out','success')
            localStorage.removeItem('token')
            logChecker()
        }
    return(
  
        <div>
           
         
            {logedIn ? 
            ( <div>
                <nav  className="navbar navbar-inverse bg-info ">
                <div className="container-fluid">
                    <div className="navbar-header">
                            <Link className="navbar-brand text-white" 
                            to='/home'>Home</Link>
                            <Link className="navbar-brand text-white" 
                            to='/setting'>Settings</Link>
                            <Link className="navbar-brand text-white" 
                            to='/profile'>Profile</Link>
                            <Link className="navbar-brand text-white" 
                            style={{position:'absolute',right:'80px',top:'4px'}} 
                            to='/Print'>Report</Link>
                            <Link className="navbar-brand text-white" 
                            style={{position:'absolute',right:'0px',top:'3px'}} 
                            to='/login' onClick={handleLogout}>LogOut</Link>
                            
                    </div>
                </div>
            </nav>
               
              </div>):
            (<div className='navigation'>
                <nav  className="navbar navbar-inverse bg-secondary text-white">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <span className="navbar-brand text-white ">Expense App </span>
                            <Link className="navbar-brand  text-white" 
                            to='/register'>Register</Link>
                            <Link className="navbar-brand text-white" 
                            to='/login'>Login</Link>
                            
                    </div>
                </div>
            </nav>
              
            </div>)}
          
           

            <Route path='/register' component={Register} exact={true} />
         
            <Route path='/login' render={(props)=>{
                        return <Login {...props} logChecker={logChecker}/>
            }} />
            
           
            <PrivateRouter path='/home' component={Home} exact={true} />
            <PrivateRouter path='/setting' component={Settings} exact={true} />
            <PrivateRouter path='/profile' component={Profile} exact={true} /> 
            <PrivateRouter path='/print' component={PrintTable} exact={true} /> 
        </div>
    )
}

export default Navigation