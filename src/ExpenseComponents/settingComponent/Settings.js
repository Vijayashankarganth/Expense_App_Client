import React,{useState} from "react";
import Budget from "./Budget";
import Category from "./Category";
import CategoryList from "./CategoryList";

const Settings=(props)=>{
    const [toggleCategory,setToggleCategory]=useState(false)
  

    const toggleEdit=()=>{
        setToggleCategory(!toggleCategory)
    }

    const handleToggle=()=>{
       toggleEdit()
    }
    return (
        <div>
        <Budget /><br/>
        <button  className="btn btn-primary" onClick={handleToggle}>Category</button>
        {toggleCategory && 
        <Category action='Add Category' toggleEdit={toggleEdit} />}
        <CategoryList />
     
        </div>
    )
}

export default Settings