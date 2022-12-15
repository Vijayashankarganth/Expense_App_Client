
import axios from 'axios'
import swal from 'sweetalert'


export const startGetBudget=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:4321/api/user/budget/list',{
            headers:{
                "X-Auth":localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const result =response.data
            dispatch(getBudget(result))
         })
         .catch((error)=>{
           swal('Oops',error.message,'error')
         })
    }
}

export const getBudget=(data)=>{
    return {
        type:"GET_BUGET",
        payload:data
    }
}

export const startUpdateBudget=(budgetData)=>{
    
    return (dispatch)=>{
        
            axios.put('http://localhost:4321/api/user/budget/update',budgetData,{
                headers:{
                    "X-Auth":localStorage.getItem('token')
                }
            })
                 .then((response)=>{
                    const result = response.data
                    dispatch(updateBudget(result))
                 })
                 .catch((error)=>{
                   swal('Oops',error.message,'error')
                 })
       
       
    }
}

export const updateBudget=(data)=>{
    return {
        type:"UPDATE_BUDGET",
        payload:data
    }
}