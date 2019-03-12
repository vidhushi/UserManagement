import React, { Component } from 'react'
import { Header, Button,  Grid } from 'semantic-ui-react';
import updateheader from '../Beautification/Beautification.css';
import between from '../Beautification/Beautification.css';
import between2 from '../Beautification/Beautification.css';
import updatebody from '../Beautification/Beautification.css';
import formcard from '../Beautification/Beautification.css';
import backgoundcolor from '../Beautification/Beautification.css';


class Update extends Component {
constructor () 
{
    super();
    this.state = {
            newuser: '',
             MobileNumber : '',
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
    MobileNumber : this.state.MobileNumber,
    first_name : this.state.first_name,
    last_name : this.state.last_name,
    Email : this.state.Email,
    IsStatus : this.state.IsStatus,
    UserType : this.state.UserType,
    Password : this.state.Password
  }

  
  console.log(JSON.stringify(user));

  console.log(this.state)
    
  fetch('http://localhost:4000/updateUserData', {
  method: 'PUT', 
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
            <div className="updateheader">
            <Header></Header>
            <h2>To Update User please enter the following details</h2>
            </div>
            <div className="between"></div>
            <div className="updatebody">
            <div className="between2"></div>

            <div className="formcard">
  
            <Grid divided='vertically'>
            <Grid.Row columns={1}>
            <Grid.Column>
           <div>MobileNumber of User: <input type = "text" name = "MobileNumber" onChange={this.handleChange} value={this.state.MobileNumber}  /> </div> 
           </Grid.Column>    
           </Grid.Row>     

           <Grid.Row columns={2}>
           <Grid.Column>
           <div>First name: <input type = "text" name = "first_name" onChange={this.handleChange} value={this.state.first_name} /></div>
           </Grid.Column>
           <Grid.Column>
           <div>Last name: <input type = "text" name = "last_name" onChange={this.handleChange} value={this.state.last_name} /></div>
           </Grid.Column>
           </Grid.Row>

           <Grid.Row columns={2}>
           <Grid.Column>
           <div>Email: <input type = "text" name = "Email" onChange={this.handleChange} value={this.state.Email} /></div>
           </Grid.Column>
           <Grid.Column>
           <div> Status:<input type = "text" name = "IsStatus" onChange={this.handleChange} value={this.state.IsStatus}/></div>
           </Grid.Column>
           </Grid.Row>

           <Grid.Row columns={2}>
           <Grid.Column>
           <div>Type<input type = "text" name = "UserType" onChange={this.handleChange} value={this.state.UserType} /></div>
           </Grid.Column>
           <Grid.Column>
           <div>Password<input type = "text" name = "Password" onChange={this.handleChange} value={this.state.Password} /></div>
           </Grid.Column>
           </Grid.Row>
            </Grid>   
            <div className="backgoundcolor">
          <Button inverted color='black' onClick={this.handleSubmit}>Update user</Button>
            </div>   
          </div>
          </div>
         
          
            </div>
        );
      }

}

export default Update;