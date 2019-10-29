import React from 'react';
import './left.css';
import { Row, Col, Icon, Table, Tag } from 'antd';
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
const data = [
  {
    id: 1,
    name: '高等数学(上)',
    term: 1,
    weekNum: 8,
    pre: ['无']
  },
  {
    id: 2,
    name: '高等数学(下)',
    term: 2,
    weekNum: 8,
    pre: ['高等数学(上)']
  },
  {
    id: 3,
    name: '概率论',
    term: 3,
    weekNum: 8,
    pre: ['高等数学(下)','线性代数']
  },
];
export default class Left extends React.Component{
  constructor(props){
    super(props);
  }

  render () {
    return (
      <div className="Lcontainer">
        <Row style={{height:'100%'}}>
          <Col span={24} style={{height:'100%'}}>
            <div style={{padding:'12px',height:'100%',borderStyle:'solid',borderWidth:'1px',borderRadius:'24px'}}>
              <Table columns={columns} dataSource={data} style={{height:'100%'}}/>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}