import React from "react";
import { Table } from "antd";
const TableCalculation=(props)=>{
    const {totalBudget,totalExpenseAmount}=props

    const dataSource=[
        {
            key:1,
            particular:'Total Budget',
            amount:totalBudget
        },
        {
            key:2,
            particular:'Total Expenses',
            amount:totalExpenseAmount
        },
        {
            key:3,
            particular:'Wallet Amount',
            amount:totalBudget-totalExpenseAmount
        }
    ]
    const columns=[
        {
            title:'Sl.No',
            dataIndex:'key'
        },
        {
            title:'Particulars',
            dataIndex:'particular'
        },
        {
            title:'Amount',
            dataIndex:'amount'
        }
    ]
    return (
        <div style={{position:'absolute',width:'550px',right:'200px'}}>
            <Table 
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            ></Table><br/>
        </div>
    )
}

export default TableCalculation