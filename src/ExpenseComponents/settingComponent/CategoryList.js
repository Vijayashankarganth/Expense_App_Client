import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { startCategoryList,startCategoryUpdate } from "../../redux/actions/categoryAction";
import Category from "./Category";

const CategoryList=()=>{
    const [categoryEdit,setCategoryEdit]=useState({})
    const [editToggle,setEditToggle]=useState(false)

    const toggleEdit=()=>{
        setEditToggle(!editToggle)
    }
    
    const category=useSelector((state)=>{
        return state.category
    })
    const dispatch = useDispatch()
  
    useEffect(()=>{
        dispatch(startCategoryList())
    },[dispatch])

    const handleDelete=(id)=>{
        const action = 'delete'
        dispatch(startCategoryUpdate(id,action))
    }

    const handleRestore=(id)=>{
        const action = 'restore'
        dispatch(startCategoryUpdate(id,action))
    }

    const handleCategoryEdit=(data)=>{
        setCategoryEdit(data)
         toggleEdit()
    }
    return (
         <div>
            {category.length >=0 && 
             (<>
             {editToggle && (
                <div>
                <Category {...categoryEdit} action='update' toggleEdit={toggleEdit}/>
                </div>
             )}
             <div className="w-75 p-2">
             <br/>
             <table>
                <tbody>
                    {category.map((ele)=>{
                        if(ele.isDeleted === true){
                            return (
                                <tr key={ele._id}>
                                <td><del>{ele.name}</del></td>
                                <td><button className="btn btn-link" disabled={true}>Edit</button></td>
                                <td><button onClick={()=>{handleRestore(ele._id)}}  className="btn btn-primary btn-sm">Restore</button></td>
                            </tr>
                            )
                        }
                        else{
                            return (
                            <tr key={ele._id}>
                                <td>{ele.name}</td>
                                <td><button className="btn btn-link" onClick={()=>{handleCategoryEdit(ele)}}>Edit</button></td>
                                <td><button onClick={()=>{handleDelete(ele._id)}}  className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        )
                        }
                       
                    })}
                </tbody>
             </table>
             </div>
             </>)
             } 
         </div>
    )
}

export default CategoryList