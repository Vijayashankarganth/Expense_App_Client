import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import '../../CSS/expense.css'
import { startExpenseAdd } from '../../redux/actions/expenseAction'
import swal from 'sweetalert'

const ExpenseForm=(props)=>{
    const {cancelModal,budgetRemain}=props
    const dispatch=useDispatch()

    const categoryList=useSelector((state)=>{
        return state.category.filter((ele)=>{
            return !ele.isDeleted
        })
    })

  
    const formik = useFormik({
        initialValues:{
            title:'',
            amount:'',
            expenseDate:'',
            categoryId:''
        },
        validationSchema:Yup.object({
            title:Yup.string().required(),
            amount:Yup.number().required().typeError('Invalid Number Format'),
            expenseDate:Yup.date().required(),
            categoryId:Yup.string().required()
        }),
        onSubmit:function(values,{resetForm}){

            if(Number(values.amount) <= budgetRemain){
            const ExpenseData={
                title:values.title,
                amount:Number(values.amount),
                expenseDate:values.expenseDate,
                categoryId:values.categoryId
            }
            dispatch(startExpenseAdd(ExpenseData,resetForm)) 
            cancelModal()
            }
            else{
                swal(`${Number(values.amount)}`,'Expense Amount  Greater Than Budget Amount!!!','warning')
            }
        }   
    })

    return (
        <div>
            <div className='expense'>
                <form onSubmit={formik.handleSubmit}>
                    <select  name='categoryId' onChange={formik.handleChange}>
                        <option >select category</option>
                        {categoryList.map((ele)=>{
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                        })}
                    </select><br/>
                    {formik.touched.categoryId && formik.errors.categoryId && <span>{formik.errors.categoryId}</span>}
                    <br/>
                    <input type='text'
                           value={formik.values.title}
                           name='title'
                           onChange={formik.handleChange}
                           placeholder='Enter Expense Name'
                    /><br/>
                    {formik.touched.title && formik.errors.title && <span>{formik.errors.title}</span>}
                    <br/>
                    <input type='text'
                           value={formik.values.amount}
                           name='amount'
                           onChange={formik.handleChange}
                           placeholder='Enter Expense Amount'
                    /><br/>
                    {formik.touched.amount && formik.errors.amount && <span>{formik.errors.amount}</span>}
                    <br/>
                    <input type='date'
                           value={formik.values.expenseDate}
                           name='expenseDate'
                           onChange={formik.handleChange}
                    /><br/>
                    {formik.touched.expenseDate && formik.errors.expenseDate && <span>{formik.errors.expenseDate}</span>}
                    <br/>
                    <input type='submit' value='add' />
                </form>
            </div>
        </div>
    )
}

export default ExpenseForm