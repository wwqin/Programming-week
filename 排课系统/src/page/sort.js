function Vertex(name) {
  this.name =name;
  this.in = 0;
}
Vertex.prototype.setFirstedge = function(edgeNode) {
  this.firstEdge = edgeNode;
  edgeNode.adjVex.in++;
};
Vertex.prototype.setNext = function(edgeNode){
  var temp = this.firstEdge;
  if(!temp){
    this.firstEdge = edgeNode;
    edgeNode.adjVex.in++;
    return;
  }else{
    while(temp){
      var temp1 = temp.next;
      if(!temp1){
        temp.next = edgeNode;
        edgeNode.adjVex.in++;
        break;
      }else{
        temp = temp.next;
      }
    }
  }
}
function EdgeNode(){
  this.adjVex = arguments[0];
  this.weight = arguments[1] ? arguments[1] : undefined;
}
function Graph(vertexs,numEdges){
  this.vertexs = vertexs;
  this.numVertexs = this.vertexs.length;
  this.numEdges = numEdges;
}
function Node(data) {
    this.data = data;
}
function Stack(maxSize){
    this.maxSize = maxSize;
    this.top = -1;
    this.data = new Array(maxSize);
}
Stack.prototype.push = function(node){
    if(this.top == this.maxSize-1){
        return 1;
    }
    this.top++;
    this.data[this.top] = node;
    return 0;
}
Stack.prototype.pop = function(){
    if(this.top==-1){
        return 1;
    }
    var r = this.data[this.top];
    this.data[this.top] = undefined;
    this.top--;
    return r;
}
Stack.prototype.ergodic = function(){
  var s = '';
  for (var i = 0; i < this.data.length; i++) {
    if(this.data[i]!=null){
        s += this.data[i]+',';
    }
  }
  if(s.length){
    s = s.substring(0,s.length-1);
  }
  return s;
}
Stack.prototype.length = function(){
  return this.top+1;
}
Graph.prototype.topologicalSort = function() {
  var top = 0,count = 0;
  var gettop,k;
  var result ='';//结果
  var stack = new Stack(this.numVertexs)
  for (var i = 0; i < this.numVertexs; i++) {
    if(this.vertexs[i].in==0){
      stack.push(i);
    }
  }
  while(stack.length()){
    gettop = stack.pop();
    result += this.vertexs[gettop].name +' ';
    count++;
    for (var e = this.vertexs[gettop].firstEdge; e; e=e.next) {
      k = this.vertexs.indexOf(e.adjVex);
      if(!(--this.vertexs[k].in)){
        stack.push(k);
      }
    }
  }
  if(count<this.numVertexs){
    console.error('发生错误');
    return false;
  }
  result = result.split(' ')
  result.length-=1;
  console.info(result);
  return result;
};

function dataInit(data){
  let result = {}
  data.map(item => {
    result[item.name] = item
  })
  data.map(item => {
    result[item.name]['node'] = new Vertex(item.name)
  })
  return result;
}

export default function madeGraph(data){
  let Sum = 0,arr=[];
  data.map(item => {
    item.id = parseInt(item.id)
    item.term = parseInt(item.term)
    item.weekNum = parseInt(item.weekNum)
    item.flag == 'true'||item.flag==true?item.flag=true:item.flag=false
  })
  let list = dataInit(data)
  console.log(data)
  for (let i in list) {
    if(list[i].pre[0]!=='无'){
      list[i].pre.map(item => {
        list[item].node.setNext(new EdgeNode(list[i].node))
        Sum++;
      })
    }
    arr.push(list[i].node)
  }
  let gg = new Graph(arr,Sum)
  gg.topologicalSort().map(item => {
    if(list[item].pre[0] !== '无' && list[item].flag){
      list[item].pre.map($_item => {
        if(list[item].term<list[$_item].term+1)
          list[item].term = list[$_item].term+1
      })
    }
  })
  let L=[[],[],[],[],[],[],[],[]]
  console.log(list)
  for(let i in list){
    switch(parseInt(list[i].term)){
      case 1:
        L[0].push(list[i]);
        break;
      case 2:
        L[1].push(list[i]);
        break;
      case 3:
        L[2].push(list[i]);
        break;
      case 4:
        L[3].push(list[i]);
        break;
      case 5:
        L[4].push(list[i]);
        break;
      case 6:
        L[5].push(list[i]);
        break;
      case 7:
        L[6].push(list[i]);
        break;
      case 8:
        L[7].push(list[i]);
        break;
    }
  }
  return L
}