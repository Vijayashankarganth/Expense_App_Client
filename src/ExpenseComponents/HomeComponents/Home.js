import React,{useState ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import { startCategoryList } from "../../redux/actions/categoryAction";
import { startExpenseList } from "../../redux/actions/expenseAction";
import { startGetBudget } from "../../redux/actions/budgetAction";
import { ProgressBar,ProgressChart,ProgressTable } from "../ExpensePresentation/DataProgress";
import '../../CSS/progress.css'
import {Modal,Button,Input} from 'antd'


const Home=(props)=>{
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchInput,setSearchInput]=useState('')
    const [tableDisplay,setTableDisplay]=useState('all')

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startGetBudget())
        dispatch(startCategoryList())
        dispatch(startExpenseList())
    },[dispatch])

    
    const showModal = () => {
      setIsModalOpen(true);
    }
  
    const cancelModal = () => {
      setIsModalOpen(false);
    }
 

    const expenseList=useSelector((state)=>{
        return state.expense
    })
    const handleSearch=(e)=>{
        setSearchInput(e.target.value)
    }
    const searchData=expenseList.filter((ele)=>{
        
            if(tableDisplay === 'all'){
                return (
                    ele.title.toLowerCase().match(searchInput.toLowerCase()) ||
                    ele.categoryId.name.toLowerCase().match(searchInput.toLowerCase())
                    )
            }
            if(tableDisplay === 'non-deleted'){
                return (
                    !ele.isDeleted && !ele.categoryId.isDeleted 
                )
                
            }
            else{
                    return ele.isDeleted || ele.categoryId.isDeleted
            }
        
    })
    
    const budgetAmount=useSelector((state)=>{
        return state.budget
    })

    const expenseAmount=useSelector((state)=>{
        return state.expense.filter((ele)=>{
            return !ele.isDeleted && !ele.categoryId.isDeleted
        })
    })

    const totalExpense=expenseAmount.reduce((pv,cv)=>{
        return cv.isDeleted ? pv : pv+cv.amount
    },0)
 
    let totalBudget=Math.round(budgetAmount.budget)

    let expensePercentage=Math.round((totalExpense/totalBudget)*100)

    let budgetPercentage=Math.round((((totalBudget-totalExpense)/totalBudget)*100))

    let budgetRemain = Math.round(totalBudget-totalExpense)

   
    const handleSelect=(e)=>{
        setTableDisplay(e.target.value)
    }
  
   
    const category=useSelector((state)=>{
        return state.category.filter((ele)=>{
            return !ele.isDeleted
        })
    })

    const expense = useSelector((state)=>{
        return state.expense.filter((ele)=>{
            return !ele.isDeleted && !ele.categoryId.isDeleted
        })
    })
   

    const tableData=category.map((ele)=>{
                 return  expense.filter((ele1)=>{
                        return ele._id === ele1.categoryId._id 
                    })        
    })
    
    const  categoryWiseData = []

            tableData.forEach((ele)=>{
            if(ele.length > 0){
               const name = ele[0].categoryId.name
               const amount = ele.reduce((pv,cv)=>{
                    return pv + cv.amount
               },0)

               categoryWiseData.push({name,amount,count:ele.length})
            }
    })



    return (
     <div >
        <div className="row">
            <div className=" col-4 progress">
                 <div className="mx-4 mt-4" > <ProgressBar 
                 expensePercentage={expensePercentage} budgetRemain={budgetRemain}
                  totalBudget={totalBudget} totalExpense={totalExpense} 
                  budgetPercentage={budgetPercentage}  /></div>
            </div>

            <div className="position-absolute top-20 start-75 chart">
                 <div 
                        className="col-3 " 
                        style={{position:'absolute',top:'0px'}}>
                        <ProgressChart 
                        categoryWiseData={categoryWiseData} 
                        />
                 </div>
                 <div className="mt-5 ">
                 <ProgressTable  categoryWiseData = {categoryWiseData}/>
                 </div>
             </div>
        </div>

        <div className="row">
            <div className="col-6">
                <Button type="primary" onClick={showModal} disabled={budgetRemain === 0}>ADD_EXPENSE</Button>
                <Modal 
                    title="Add Expense" 
                    open={isModalOpen} 
                    okButtonProps={{style:{display:'none'}}}
                    onCancel={cancelModal}>
                    <ExpenseForm cancelModal={cancelModal}  budgetRemain={budgetRemain} 
                    />   
                </Modal>
            </div> 
            <div className="col-2 ms-auto">
                 <Input type='text' value={searchInput} disabled={tableDisplay !== 'all'} 
                 placeholder='Search' onChange={handleSearch} />
            </div>
            <div>
           
            </div>
        </div> 

        <div ><br/>
          <select className="form-select " onChange={handleSelect}>
            <option value='all'>All</option>
            <option value='deleted'>Deleted</option>
            <option value='non-deleted'>Non-Deleted</option>
          </select>
        </div>
    
        <div >
            <br/>
            <ExpenseTable  searchData={searchData}  budgetRemain={budgetRemain}
             totalBudget={totalBudget} totalExpense={totalExpense} />
        </div> 
    </div>
    )
}
export default Home