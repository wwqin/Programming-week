import React from 'react';
import './home.css';
import axios from 'axios';
import madeGraph from './sort';
import { Row, Col, Icon } from 'antd';
import Left from './Left.jsx';
import Middle from './Middle.jsx';
import Right from './Right.jsx';

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show:'',
      data:[]
    }
  }

  componentDidMount(){
    let _this = this
    axios.get('http://127.0.0.1:8022/find')
    .then(function (res) {
      console.log(_this.handleData(madeGraph(res.data.data)));
      _this.setState({data:madeGraph(res.data.data)})
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  handleData(data){
    let arr = [];
    data.map(_item => {
      let result = [new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null),new Array(6).fill(null)]
      let num = 0;
      if(!_item){
        return result
      }else{
        _item.map(item => {
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
        arr.push(result);
      }
    })
    
    return arr;
  }

  render () {
    return (
      <div className="container">
        <Row style={{height:'85vh'}}>
          <Col span={16} offset={4} style={{height:'100%'}}>
            <Left />
          </Col>
        </Row>
        <Row style={{height:'15vh'}}>
          <Col span={8} offset={8} className='nav'>
            <Row style={{height:'100%'}}>
              <Col span={8} style={{height:'100%'}}>
                <div className="icon-T"><Icon type="calendar" /></div>
              </Col>
              <Col span={8} style={{height:'100%'}}>
                <div className="icon-R"><Icon type="align-left" /></div>
              </Col>
              <Col span={8} style={{height:'100%'}}>
                <div className="icon-R"><Icon type="edit" /></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}