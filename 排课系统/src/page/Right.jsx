import React from 'react';
import './right.css';
import { Row, Col, Input, Tooltip, Button } from 'antd';

export default class Right extends React.Component{
  constructor(props){
    super(props);
  }

  render () {
    return (
      <div className="Rcontainer">
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="课程名称">
              <Input placeholder='请输入课程名称'/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="课程学期(0为系统自动排课)">
              <Input placeholder='请输入课程学期'/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="周课时">
              <Input placeholder='请输入周课时'/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <Tooltip placement="topLeft" title="前置课程(中间用空格隔开)">
              <Input placeholder='请输入前置课程'/>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{marginTop:'3vh'}}>
          <Col span={16} offset={4}>
            <span style={{float:'right'}}><Button>提交</Button></span>
          </Col>
        </Row>
      </div>
    )
  }
}