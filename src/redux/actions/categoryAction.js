import axios from 'axios'

export const startCategoryAdd=(catagoryData)=>{
    return (dispatch)=>{
        axios.post('http://localhost:4321/api/user/category',catagoryData,{
            headers:{
                "X-Auth":localStorage.getItem('token')
            }
        })
             .then((response)=>{
                const result = response.data
                dispatch(addCategory(result))
             })
             .catch((error)=>{
                alert(error)
             })
    }
}

export const addCategory=(data)=>{
    return {
        type:"ADD_CATEGORY",
        payload:data
    }
}

export const startCategoryList=()=>{
       return(dispatch)=>{
        axios.get('http://localhost:4321/api/user/category/list',{
            headers:{
                "X-Auth":localStorage.getItem('token')
            }
        })
         .then((response)=>{
            const result = response.data
            dispatch(listCategory(result))
         })
         .catch((error)=>{
            alert(error)
         })
       } 
}

export const listCategory=(data)=>{
    return {
        type:"CATEGORY_LIST",
        payload:data
    }
}

export const startCategoryUpdate=(id,action,data=null,toggle)=>{

        return (dispatch)=>{
                axios.put(`http://localhost:4321/api/user/category/update/${id}?action=${action}`,data,{
                    headers:{
                        "X-Auth":localStorage.getItem('token')
                    }
                })
                .then((response)=>{
                    const result = response.data
                    dispatch(categoryUpdate(result))
                    if(action === 'update'){
                        toggle()
                    }
                   
                })
                .catch((error)=>{
                    alert(error)
                })
            }       
}

export const categoryUpdate=(data)=>{
    return {
        type:"UPDATE_CATEGORY",
        payload:data
    }
}