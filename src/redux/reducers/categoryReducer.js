const initialValue=[]

const categoryRegister=(state=initialValue,action)=>{
    switch(action.type){
        case "CATEGORY_LIST":{
            return [...action.payload]
        }
        case "ADD_CATEGORY":{
            return [...state,{...action.payload}]
        }
        case "UPDATE_CATEGORY":{
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default categoryRegister