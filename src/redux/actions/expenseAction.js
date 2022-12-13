import axios from 'axios'

export const startExpenseAdd=(expenseData,resetForm)=>{
    return (dispatch)=>{
        axios.post('http://localhost:4321/api/user/expense',expenseData,{
            headers:{
                'X-Auth':localStorage.getItem('token')
            }
        })
            .then((response)=>{
                const result = response.data
                dispatch(addExpense(result))
                resetForm()
            })
            .catch((error)=>{
                alert(error.message)
            })
    }
}

export const addExpense=(data)=>{
    return {
        type:"ADD_EXPENSE",
        payload:data
    }
}

export const startExpenseList=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:4321/api/user/expense/list',{
            headers:{
                "X-Auth":localStorage.getItem('token')
            }
        })
            .then((response)=>{
                const result = response.data
                dispatch(listExpense(result))
            })
            .catch((error)=>{
              alert(error.message)
            })
    }
}

export const listExpense=(data)=>{
    return {
        type:"LIST_EXPENSE",
        payload:data
    }
}


export const startExpenseUpdate=(id,action,data=null)=>{
    return(dispatch)=>{

            axios.put(`http://localhost:4321/api/user/expense/update/${id}?action=${action}`,data,{
                headers:{
                    'X-Auth':localStorage.getItem('token'),
                }
            })
                .then((response)=>{
                    const result = response.data
                    dispatch(updateExpense(result))
                })
                .catch((error)=>{
                    alert(error.message)
                })
        
            } 
}

export const updateExpense=(data)=>{
    return {
        type:'UPDATE_EXPENSE',
        payload:data
    }
}