import React, { Component } from 'react';
import Axios from "axios";

import './App.css';

const Card = (props)=>{
  return(
    <div>{props.name}</div>
  )
}
const CardList = (props)=>{
  return(
    <div>
    {props.card.map(cards=><Card key={cards.id}{...cards}/>)}
    </div>
  )
}

class Form extends Component{
  state = {
    infor :""
  }
  handleClick = (e)=>{
    e.preventDefault();
    Axios.get(`https://api.github.com/users/${this.state.infor}`)
    .then(result =>{
      this.props.newData(result.data);
    });
    this.setState({infor:''});
  }
  render(){
    
    return(
      <form onSubmit={this.handleClick}>
        <input
        value={this.state.infor}
        onChange={(event)=>this.setState({
          infor:event.target.value
        })} 
        type="text" placeholder="input name"/>
        <input type="submit" />
      </form>
    )
  }
}
class App extends Component{
  state = {
    data:[
     
    ]
  }
  updateData =(props)=>{
    this.setState(
      prevState =>({
        data :prevState.data.concat(props)
      })
    )
  }
  render(){
    return (
      <div>
      <CardList card={this.state.data}/>
      <Form newData={this.updateData}/>
      </div>
    )
  }
}
export default App;
