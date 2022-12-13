const initialValue={}

const budgetReducer=(state=initialValue,action)=>{
    switch(action.type){
        case "GET_BUGET":{
            return {...action.payload}
        }
        case "UPDATE_BUDGET":{
            return {...state,budget:action.payload.budget}
        }
        default:{
            return {...state}
        }
    }
}
export default budgetReducer