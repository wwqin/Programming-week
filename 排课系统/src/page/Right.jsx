import React from 'react';
import './right.css';
import { Row, Col, Input, Tooltip, Button } from 'antd';
import axios from 'axios';
let flag = true
export default class Right extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      weekNum:'',
      term:'',
      pre:[]
    }
  }

  handleSubmit(data){
    let _this = this;
    let max = data[0].id;
    data.map(item=>{
      if(item.id>max){
        max = parseInt(item.id)
      }
    })
    if(flag){
      flag = false;
      axios.get('http://127.0.0.1:8022/insert',{
        params:{
          name:_this.state.name,
          weekNum:_this.state.weekNum,
          term:_this.state.term,
          pre:_this.state.pre,
          id:parseInt(max+1),
          flag:_this.state.term===0?true:false
      }
      })
      .then(function (res) {
        flag = true
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  }

  render () {
    console.log(123123)
    return (
      <div className="Rcontainer">
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="课程名称">
              <Input placeholder='请输入课程名称' onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name}/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="课程学期(0为系统自动排课)">
              <Input placeholder='请输入课程学期' onChange={(e)=>this.setState({term:e.target.value})} value={this.state.term}/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="周课时">
              <Input placeholder='请输入周课时'  onChange={(e)=>this.setState({weekNum:e.target.value})} value={this.state.weekNum}/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="前置课程(中间用空格隔开)">
              <Input placeholder='请输入前置课程' onChange={(e)=>{this.setState({pre:e.target.value.split(" ")})}}/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <span style={{float:'right'}}><Button onClick={()=>this.handleSubmit(this.props.data)}>提交</Button></span>
          </Col>
        </Row>
      </div>
    )
  }
}