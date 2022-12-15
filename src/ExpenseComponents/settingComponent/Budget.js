import React,{useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetBudget,startUpdateBudget } from "../../redux/actions/budgetAction";
import { startExpenseList } from "../../redux/actions/expenseAction";
import swal from "sweetalert";

const Budget=(props)=>{

    const [budgetValue,setBudgetValue]=useState('')

    const budget=useSelector((state)=>{
        return state.budget
    })
    
    const dispatch=useDispatch()
  
    useEffect(()=>{
        dispatch(startGetBudget())
        dispatch(startExpenseList())
    },[dispatch])
    
    const expenseAmount=useSelector((state)=>{
        return state.expense.filter((ele)=>{
            return !ele.isDeleted && !ele.categoryId.isDeleted
        })
    })

    const totalExpense=expenseAmount.reduce((pv,cv)=>{
        return cv.isDeleted ? pv : pv+cv.amount
    },0)
  
    const handleBudgetChange=(e)=>{
        setBudgetValue(e.target.value)
    }

    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const budgetData={
            budget:Number(budgetValue)
        }
        if(budgetData.budget >= totalExpense){
            dispatch(startUpdateBudget(budgetData))
            setBudgetValue('')
        }else{
            swal({
                title:'Budget Value is Lesser Than Expense Amount',
                icon:'warning'})
        }
        
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