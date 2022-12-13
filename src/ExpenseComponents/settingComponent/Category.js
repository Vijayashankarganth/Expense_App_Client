import React,{useState,useEffect} from "react";
import validator from "validator";
import { useDispatch } from "react-redux";
import { startCategoryAdd,startCategoryList, startCategoryUpdate} from "../../redux/actions/categoryAction";


const Category=(props)=>{
    const {name,_id,action,toggleEdit}=props
   
    const [categoryInput,setCatogeryInput]=useState(name || '')
    const [error,setError]=useState({})
    const formErrors={}

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startCategoryList())
    },[dispatch])

    const handleFormChange=(e)=>{
        setCatogeryInput(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(validator.isEmpty(categoryInput)){
                formErrors.name='No Category Name'
        }
        setError(formErrors)
        
        if(Object.keys(formErrors).length === 0 ){

          const catagoryData={
                name:categoryInput
          }
  
          if(action === 'Add Category'){
              dispatch(startCategoryAdd(catagoryData))
              setCatogeryInput('')
              
          }
          else if (action === 'update'){
              dispatch(startCategoryUpdate(_id,action,catagoryData,toggleEdit))
              toggleEdit()
          }
        }
       
       
    }

    const handleCancelEdit=()=>{
        toggleEdit()
    }
   
    return (
        <div >
        
            <form  onSubmit={handleSubmit}><br/>
                <input type='text' value={categoryInput} placeholder={error.name && `${error.name}`} onChange={handleFormChange} /><br/>
                
                <button className="btn btn-primary btn-sm">{action}</button>
                {action === 'update' && <button className="btn btn-danger btn-sm" onClick={handleCancelEdit}>cancel</button>}
            </form>
            
        </div>
    )
}
export default Category