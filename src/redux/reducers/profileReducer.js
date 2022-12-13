const initialValue={}

const profileReducer=(state=initialValue,action)=>{
    switch(action.type){
        case "PROFILE_LIST":{
            return {...action.payload}
        }
        case 'PROFILE_IMAGE':{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }

}
export default profileReducer