import React from 'react';
import './middle.css';
import { Row, Col } from 'antd';

export default class Middle extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      nums:0,
      result:[]
    }
  }

  weekData(data) {
    let result = [new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null)]
    let num = 0;
    if(!data){
      return result
    }else{
      data.map(item => {
        num = 0;
        while(num<item.weekNum){
          let i = parseInt(Math.random()*8),j = parseInt(Math.random()*5)
          if(!result[i][j]&&!result[i+1][j]&&i!==4){
            result[i][j] = item.name
            result[i+1][j] = item.name
            num+=2
          }
        }
      })
    }
    return result;
  }

  handleNums(num) {
    if(this.state.nums!==num)
      this.setState({nums:num})
  }

  render () {
    return (
      <div className="Mcontainer">
        <div className="Mnav">
          {this.props.data!=[]?this.props.data.map((item,index)=><div onClick={() => this.handleNums(index)} className={this.state.nums===index?'Mitemed':'Mitem'} key={index}>{index+1}</div>):''}
        </div>
        <div className="Mmain">
          {this.props.data[this.state.nums]!==undefined?this.props.data[this.state.nums].map(item => {
            return <Row style={{height:'10%'}}>{item.map(_item => {
              return <Col span={4} style={{height:'100%'}}><div className="Mmainitem">{_item===null?'':_item}</div></Col>
            })}</Row>
          }):''}
        </div>
      </div>
    )
  }
}