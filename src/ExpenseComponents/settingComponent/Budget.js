import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetBudget,startUpdateBudget } from "../../redux/actions/budgetAction";
const Budget=(props)=>{
    const [budgetValue,setBudgetValue]=useState('')

    const budget=useSelector((state)=>{
        return state.budget
    })
    const dispatch=useDispatch()
  
    useEffect(()=>{
        dispatch(startGetBudget())
    },[dispatch])
    
   

    const handleBudgetChange=(e)=>{
        setBudgetValue(e.target.value)
    }
    const prevalue=budget.budget
    const handleSubmit=(e)=>{
        e.preventDefault()
        const budgetData={
            budget:Number(budgetValue)
        }
        
        dispatch(startUpdateBudget(budgetData,prevalue))
        setBudgetValue('')
    }
    
    return(
        <>
            <br/>
            {Object.keys(budget).length > 0 && 
                (<form onSubmit={handleSubmit}>
                    <input type='text' value={budgetValue} placeholder={budget.budget} onChange={handleBudgetChange} />
                    <input type='submit' className="btn btn-primary" value='Update'/>
                </form>)
            }
        </>
    )
}

export default Budget