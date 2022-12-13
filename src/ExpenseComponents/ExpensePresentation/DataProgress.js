import { Progress,Table } from 'antd';
import { Chart } from "react-google-charts";
import { red, green } from '@ant-design/colors';
import '../../CSS/progress.css'

export const ProgressBar=(props)=>{
        
    const {budgetRemain,expensePercentage,totalExpense,budgetPercentage}=props

    return (
        <div className='row'>
            <div className='col-6 mt-4 mx-auto'>
            <Progress 
                strokeLinecap="butt" 
                type="dashboard" 
                percent={expensePercentage}
                width={180}
                format={(percent) => `${percent}% spent`}
             />
             </div>
             <div className='col-5 mt-4 ms-auto ' >
             <h5>Total Budget</h5>
                <h6>Rs.{budgetRemain}</h6>
             <Progress percent={budgetPercentage} steps={10} size="small" strokeColor={green[6]} />
             <h5>Total Expense</h5>
                <h6>Rs.{Math.round(totalExpense)}</h6>
                <Progress percent={expensePercentage} steps={10} size="small" strokeColor={[red[5],red[6],red[6],red[6],red[7],green[4],green[5],green[6],green[7],green[7],]} />
             </div>
            
        </div>
    )
}



export const ProgressTable=(props)=>{

    const {categoryWiseData}=props
   
    let count = 0
    const dataSource=categoryWiseData.map((ele,i)=>{
        count  = i
        return  {
             key:i,
             categoryName:ele.name,
             expenseCount:ele.count,
             expenseAmount:ele.amount
        }
    })
   
    const columns=[
        {
            title:'Category',
            dataIndex:'categoryName',
        },
        {
            title:'Count',
            dataIndex:'expenseCount'
        },
        {
            title:'Amount',
            dataIndex:'expenseAmount'
        }
    ]
    return (
        <div>
            {count >= 5 && 
            <Table
                rowClassName={()=>'table'}
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={{pageSize: 4}}
               
                size='small'
            ></Table>}
        </div>
    )
}


export const ProgressChart=(props)=>{

   const {categoryWiseData}=props

   const data = [["Expense", "Amount"]]
   
    let count = 0
    const chartdata=categoryWiseData.filter((ele,i)=>{
        count = i
        return i<5 && ele
    })
   
    chartdata.forEach((ele)=>{
            data.push([ele.name,ele.amount])
    })
   const options = { is3D:true,backgroundColor: ''}
    return (
        <div>
            {count < 5 &&
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"200%"}
                height={"300px"}
            />}
        </div>
    )
}