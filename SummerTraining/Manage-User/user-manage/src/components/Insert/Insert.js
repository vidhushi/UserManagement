import React, { Component } from 'react'
import { Header, Grid, Button, Segment } from 'semantic-ui-react';
import header from '../Beautification/Beautification.css';
import between from '../Beautification/Beautification.css';
import between2 from '../Beautification/Beautification.css';
import formcard from '../Beautification/Beautification.css';
import body from '../Beautification/Beautification.css';
import backgoundcolor from '../Beautification/Beautification.css';


class Insert extends Component {
constructor () 
{
    super();
    this.state = {
            newuser: '',
             id : '',
            first_name : '',
            last_name : '',
            Email : '',
            IsStatus : '',
            UserType : '',
            Password : ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }


   

 
handleSubmit (){

  let user = {
    id : this.state.id,
    first_name : this.state.first_name,
    last_name : this.state.last_name,
    Email : this.state.Email,
    IsStatus : this.state.IsStatus,
    UserType : this.state.UserType,
    Password : this.state.Password
  }

  
  console.log(JSON.stringify(user));

  console.log(this.state)
    
  fetch('http://localhost:4000/InsertUserData', {
  method: 'POST', 
  body: JSON.stringify(user),
  headers:{
    'Content-Type': 'application/json',
  }
})
.then( res => res.json())
.then( data=>{
      console.log(data);
      this.props.click();
    })
    
}

handleChange (evt)
 {
    this.setState({ [evt.target.name]: evt.target.value });
 }

    render() {
        return (
            <div>
            <div className="header">
            <Header></Header>
            <h2>To Insert User please enter the following details</h2>
            </div>
            <div className="between"></div>
            <div className="body">
            <div className="between2"></div>
  
           
            
            
            <div className="formcard">
           
            <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
           <div> <input type = "text" placeholder="Id of User" name = "id" onChange={this.handleChange} value={this.state.id}  /> </div>  
           </Grid.Column>    
           </Grid.Row>

           <Grid.Row columns={2}>
           <Grid.Column>
           <div> <input type = "text" placeholder="First name" name = "first_name" onChange={this.handleChange} value={this.state.first_name} /></div>
           </Grid.Column>
           <Grid.Column>
           <div> <input type = "text" placeholder=" Last name" name = "last_name" onChange={this.handleChange} value={this.state.last_name} /></div>
           </Grid.Column>
           </Grid.Row>

           <Grid.Row columns={2}>
           <Grid.Column>
           <div> <input type = "text" placeholder="Email" name = "Email" onChange={this.handleChange} value={this.state.Email} /></div></Grid.Column>
           <Grid.Column>
           <div> <input type = "text" placeholder="Status" name = "IsStatus" onChange={this.handleChange} value={this.state.IsStatus}/></div></Grid.Column>
           </Grid.Row>

           <Grid.Row columns={2}>
           <Grid.Column>
           <div><input type = "text" placeholder="Type" name = "UserType" onChange={this.handleChange} value={this.state.UserType} /></div></Grid.Column>
           <Grid.Column>
           <div><input type = "text" placeholder="Password" name = "Password" onChange={this.handleChange} value={this.state.Password} /></div></Grid.Column>
           </Grid.Row>
           </Grid>


           <div className="backgoundcolor">
          <Button  inverted color='black' onClick={this.handleSubmit}>Insert user</Button>
          </div>
          </div>
         
          </div>
          
         
          
         

         
          
          
            </div>
        );
      }

}

export default Insert;