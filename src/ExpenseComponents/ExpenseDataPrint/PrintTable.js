import React,{useRef,useEffect}  from "react";
import { useSelector,useDispatch } from "react-redux";
import { startExpenseList } from "../../redux/actions/expenseAction";
import { startGetBudget } from "../../redux/actions/budgetAction";
import { startProfileList } from "../../redux/actions/profileAction";
import TableCalculation from "./PrintTableCalc";
import {useReactToPrint} from "react-to-print";
import { Table } from "antd";
import swal from "sweetalert";

const PrintTable=()=>{
    const dispatch=useDispatch()

    const expenseList=useSelector((state)=>{
        return state.expense.filter((ele)=>{
            return !ele.isDeleted && !ele.categoryId.isDeleted
        })
    })

    const budget=useSelector((state)=>{
        return state.budget
    })

    const profileData = useSelector((state)=>{
        return state.profile
    })

    const totalBudget=budget.budget
    useEffect(()=>{
        dispatch(startExpenseList())
        dispatch(startGetBudget())
        dispatch(startProfileList())
    },[dispatch])

    const totalExpenseAmount = expenseList.reduce((pv,cv)=>{
        return pv + cv.amount
    },0)
    
    const dataSource=expenseList.map((ele,i)=>{
        return {
            key:i+1,
            categoryName:ele.categoryId.name,
            expenseName:ele.title,
            expenseAmount:ele.amount
        }
    })
    const columns=[
        {
            title:'Sl.No',
            dataIndex:'key'
        },
        {
            
            title:'Category',
            dataIndex:'categoryName'
        },
        {
            title:'Expense',
            dataIndex:'expenseName'
        },
        {
            title:'Amount',
            dataIndex:'expenseAmount'
        }
    ]
    
    // ---> Print process
    const  componentRef=useRef();
    const handlePrint=useReactToPrint({
        content : ()=> componentRef.current,
        documentTitle:'table',
        onAfterPrint:()=> swal('success')
    })
    // print process <---
    return (
       <div >
            <div style={{backgroundColor:"rgba(18, 193, 236, 0.897)"}}>
              <button 
              style={{backgroundColor:"rgba(18, 193, 236, 0.897)",border:'10px'}} 
              onClick={handlePrint} >
              Print</button>
           </div>
           <div ref={componentRef}>
           <h4 className="text-center">Account Details:-</h4>
           {Object.keys(profileData).length > 0 && 
           <>
           <p className="text-center">Name-{profileData.profile.name}</p>
           <p className="text-center">Gender-{profileData.profile.gender}</p>
           <p className="text-center">createdAt-{profileData.createdAt.slice(0,10).split('-').reverse().join('-')}</p>
           <h5 className="text-center">Expense Summary</h5>
           </>
           }
            <Table 
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            ></Table><br/>
            <TableCalculation totalBudget={totalBudget} totalExpenseAmount={totalExpenseAmount} />
            </div>
       </div>
    )
}
export default PrintTable