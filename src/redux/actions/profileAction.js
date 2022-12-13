import axios from "axios"

export const startProfileList=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:4321/api/user/detail',{
            headers:{
                "X-Auth":localStorage.getItem('token')
            }
        })
            .then((response)=>{
                const result = response.data
                dispatch(profileList(result))
            })
            .catch((error)=>{
                alert(error)
            })
    }
}

export const profileList=(data)=>{
    return{
        type:"PROFILE_LIST",
        payload:data
    }
}

export const startUpdateProfile=(data,imagetoggle)=>{
    console.log(data,'actioninput')
    return (dispatch)=>{
        axios.put('http://localhost:4321/api/user/update',data,{
            headers:{
                "X-Auth":localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result = response.data
            dispatch(profileImage(result))
            imagetoggle()
        })
        .catch((error)=>{
            alert(error)
        })
    }
}

export const profileImage=(data)=>{
    return{
        type:'PROFILE_IMAGE',
        payload:data
    }
}