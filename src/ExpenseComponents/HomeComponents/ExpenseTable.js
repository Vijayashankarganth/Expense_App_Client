import React,{useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { startExpenseUpdate } from "../../redux/actions/expenseAction";
import { Table,Popconfirm,Form,Button,Input} from "antd";
import swal from "sweetalert";
const ExpenseTable=(props)=>{
    
    const {searchData,budgetRemain} = props
    const dispatch=useDispatch()
    const [dataSource,setDataSourse]=useState([])
    const [category,setCategory]=useState('')
    const [editTableRow,setEditTableRow]=useState(null)
    const [toggleSave,setToggleSave]=useState(false) // edit link to save link 
    
    const [form]=Form.useForm() // react form hook

   
    const categoryList=useSelector((state)=>{
        return state.category
    })

    const toggleSaveFunction=()=>{
        // to toggle the edit link to save link and viceversa
        setToggleSave(!toggleSave)
       
    }
   
    useEffect(()=>{
        const data=searchData.map((ele)=>{
            return {
                key:ele._id,
                categoryName:ele.categoryId.name,
                expenseName:ele.title,
                expenseAmount:ele.amount,
                expenseDate:ele.expenseDate.slice(0,10).split('-').reverse().join('-'),
                delete:ele.isDeleted,
                categoryDelete:ele.categoryId.isDeleted
            }
        })
        setDataSourse(data)
    },[searchData])
    
    const handleCategory = (e)=>{
        setCategory(e.target.value)
    } 
   
    const handleTableEdit=(record)=>{
        setEditTableRow(record.key)
        toggleSaveFunction() // 1. edit to save 
        form.setFieldsValue({
            categoryName:category,
            expenseName:record.expenseName,
            expenseAmount:record.expenseAmount,
            expenseDate:record.expenseDate
        }) // to show data on edit form 
   
    }
    
    const handleDeleteRow=(record)=>{
        const id=record.key
        const action='delete'
        dispatch(startExpenseUpdate(id,action))
    }

    const handleRestoreRow=(record)=>{
        if(record.expenseAmount < budgetRemain){
            const id =record.key
            const action='restore'
            dispatch(startExpenseUpdate(id,action))
        }
        else{
            swal(`${record.expenseAmount}`,'Account Balance is too low!!!','warning')
        }
        
    }
    const columns=[
        {
            title:'Category',
            dataIndex:'categoryName',
            render:(text,record)=>{
                if(editTableRow === record.key && toggleSave){
                    return (
                    <Form.Item
                        name='categoryName'   
                        rules={[{
                            required:true,
                            message:'Please Enter Expense Name'
                        }]}    
                    >
                        <select onChange={handleCategory}>
                           <option>select category</option>
                           {categoryList.map((ele)=>{
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                         })}   
                        </select>
                    </Form.Item>)
                }
                else if(record.delete || record.categoryDelete){
                    return (
                        <s>{record.categoryName}</s>
                    )
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            title:'Expense',
            dataIndex:'expenseName',
            render:(text,record)=>{
                if(editTableRow === record.key && toggleSave){
                    return (
                    <Form.Item
                        name='expenseName'
                        rules={[{
                            required:true,
                            message:'Please Enter Expense Name'
                        }]}    
                    >
                        <Input />
                    </Form.Item>)
                }
                else if(record.delete || record.categoryDelete){
                    return (
                        <s>{record.expenseName}</s>
                    )
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            title:'Amount',
            dataIndex:'expenseAmount',
            render:(text,record)=>{
                if(editTableRow === record.key && toggleSave){
                    return (
                    <Form.Item
                        name='expenseAmount'
                        rules={[{
                            required:true,
                            message:'Please Enter Expense Amount'
                        }]}    
                    >
                        <Input />
                    </Form.Item>)
                }
                else if(record.delete || record.categoryDelete){
                    return (
                        <s>{record.expenseAmount}</s>
                    )
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            title:'Date',
            dataIndex:'expenseDate',
            render:(text,record)=>{
                if(editTableRow === record.key && toggleSave){
                    return (
                    <Form.Item
                        name='expenseDate'
                        rules={[{
                            required:true,
                            message:'Please Enter Expense Date'
                        }]}    
                    >
                        <Input />
                    </Form.Item>)
                }
                else if(record.delete || record.categoryDelete){
                    return (
                        <s>{record.expenseDate}</s>
                    )
                }else{
                    return <p>{text}</p>
                }
            }
        },
        {
            title:'Operation',
            render:(_, record)=>{
                return(
                    <>
                        {!toggleSave && 
                        <Popconfirm 
                            title="Sure to Edit?" 
                            disabled={record.delete || record.categoryDelete}  
                            onConfirm={() => handleTableEdit(record)}>
                            <Button type="link primary" disabled={record.delete || record.categoryDelete}>Edit</Button>
                        </Popconfirm>}
                        {toggleSave && editTableRow === record.key &&

                        (<>
                        <Button 
                            type="link primary" 
                            htmlType="submit" >
                            save</Button>
                        <Button 
                            type="link primary" 
                            onClick={toggleSaveFunction} >
                            cancel</Button>
                        </>)}
                     
                    </>
                )
            }
        },
        {
            title:'Action',
            dataIndex:'delete',
            render:(_,record)=>{
                
                return(
                    <>
                     <Popconfirm 
                        title="Sure to Delete?" 
                        disabled={record.delete || record.categoryDelete} 
                        onConfirm={() => handleDeleteRow(record)}>
                        <Button 
                            type="primary" danger 
                            disabled={record.delete || record.categoryDelete}>
                            Delete</Button>
                     </Popconfirm>
                    </>
                )
            }
        },
        {
            title:'Action',
            render:(_,record)=>{
                return (
                    <Popconfirm 
                        title="Sure to Restore?"  
                        disabled={!record.delete || record.categoryDelete} 
                        onConfirm={() => handleRestoreRow(record)}>
                       <Button disabled={!record.delete}>Restore</Button>
                    </Popconfirm>
                )
            }
        }
    ]

    const onFinish=(values)=>{ // to save the edited row after click save 
        const id = editTableRow
        const action='update'
        if(Number(values.expenseAmount) <= budgetRemain){
        const data={
            title:values.expenseName,
            amount:Number(values.expenseAmount),
            expenseDate:values.expenseDate.split('-').reverse().join('-'),
            categoryId:category
        }
        dispatch(startExpenseUpdate(id,action,data))
        setEditTableRow(null)// to toggle the edit state 
        setCategory('')
        toggleSaveFunction() // save link to edit link
    }
    else{
        swal(`${Number(values.expenseAmount)}`,'Expense Amount  Greater Than Budget Amount!!!','warning')
    }
    }
    
  

    return (
        <div >
     
         <Form form={form} onFinish={onFinish} >
            <Table 
                columns={columns}
                dataSource={dataSource}
                pagination={{pageSize: 4}}
            ></Table>
        </Form>
        
        </div>
    )
}

export default ExpenseTable