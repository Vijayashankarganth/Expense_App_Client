import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import {startProfileList,startUpdateProfile} from '../../redux/actions/profileAction'
import '../../CSS/profile.css'
import { Input } from "antd";
const Profile=(props)=>{

    const [image,setImage]=useState('')
    
    const profileData=useSelector((state)=>{
        return state.profile
    })

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(startProfileList())
    },[dispatch])
    
    const handleImage=(e)=>{
        setImage(e.target.files[0])
      
    }

    const handleClick=()=>{

        const formData = new FormData()
        formData.append('image',image)

        const imagetoggle=()=>{
            setImage('')
        }
        
        dispatch(startUpdateProfile(formData,imagetoggle))
    }


    return( 
        <div className="profile">
            {Object.keys(profileData).length > 0 && 
            <div >
                <h2>Profile</h2>
                <p>Name: {profileData.profile.name}</p>
                <p>Gender: {profileData.profile.gender}</p>
                <p>Email: {profileData.email}</p>
                <p>Register Date: {profileData.createdAt.slice(0,10).split('-').reverse().join('-')}</p>
                <Input className="input" type="file" onChange={handleImage} />
                <button className="btn btn-primary" onClick={handleClick} disabled={!image}>Upload</button>
                <img src={`http://localhost:4321/${profileData.picture}`} alt='No Data' width='150px' style={{position:'absolute',right:121,top:60}} />
            </div>   
            }
          
           
          
        </div>
    )
}
export default Profile