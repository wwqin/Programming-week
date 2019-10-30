import React from 'react';
import './left.css';
import { Row, Col, Icon, Table, Tag } from 'antd';
import axios from 'axios';

export default class Left extends React.Component{
  constructor(props){
    super(props);
  }

  deleteItem(index){
    axios.get('http://127.0.0.1:8022/delete',{
      params:{
        id:index
      }
    })
    .then(res=>{

    })
    .catch(err=>{
      console.log(err)
    })
  }

  render () {
    const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学期',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '周课时',
      dataIndex: 'weekNum',
      key: 'weekNum',
    },
    {
      title: '前置课程',
      key: 'pre',
      dataIndex: 'pre',
      render: tags => (
        <span>
          {tags.map(tag => {
            return (
              <Tag color='geekblue' key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={()=>{console.log(record.id)}}>Delete</a>
        </span>
      ),
    }
  ];
    return (
      <div className="Lcontainer">
        <Row style={{height:'100%'}}>
          <Col span={24} style={{height:'100%'}}>
            <div style={{padding:'12px',height:'100%',borderStyle:'solid',borderWidth:'1px',borderRadius:'24px'}}>
              <Table columns={columns} dataSource={this.props.data} style={{height:'100%'}}/>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}