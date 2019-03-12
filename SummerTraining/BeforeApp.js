import React, { Component } from 'react';
import './App.css';
 import { Button } from 'semantic-ui-react';

import  Insert from './components/Insert/Insert'
import  Login from './components/Login/Login'
import backgoundcolor from './components/Beautification/Beautification.css';
import Update from './components/Update/Update';
import Delete from './components/Delete/Delete';

// import  Read from './components/Read/Read.js'

class App extends Component {

    constructor(props){
      super(props);
      
      this.state ={
          Users: [],
          Currentwindow:'Login',
          email: "",
          password: ""
      };

      
      this.insertuser = this.insertuser.bind(this);
      this.backtoread = this.backtoread.bind(this);
      this.gotoupdate = this.gotoupdate.bind(this);
      this.gotodelete = this.gotodelete.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      this.hchange = this.hchange.bind(this);
      this.handlesubmit = this.handlesubmit.bind(this);
      this.logout = this.logout.bind(this);
      
      
    }

    //component did mount start
    componentDidMount(){
      
        
             

    }


   //component did mount end 

  handlesubmit = ( ) =>{ 

    let data ={
        Email : this.state.email,
        Password : this.state.password        
    }

    fetch('http://localhost:4000/authentication', {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json',
        }
    })
    .then( res => res.json())
    .then( data=>{
          console.log(data);  
          if(data.recordset === "True"){

            console.log("record exists");
            //console.log(data.recordset);
            // this.props.switchtoread()
            this.handlechange();
            
            }
            else{
              alert("User does not exist");
             // this.setState({
               // Currentwindow: "Read"
              //})
            }  
    })
    }
    //end of handlesubmit


  hchange = input => event => {
      this.setState({ [input] : event.target.value })
  }

  
   handlechange = (Currentwindow) => {
     
    let user = {
      
      Email : this.state.email,
      Password : this.state.password
    }

   
    // for read state
     this.setState({
         Currentwindow: 'Read'
      });

     fetch('http://localhost:4000/GetUserData',{
      method: 'POST', 
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json',
      }
    })
         .then( res=>res.json() )
           .then( data=>{
        console.log(data);
        this.setState({
          Users : data.recordset
        })
        console.log(this.state.Users);
      })


   } 
    
  insertuser = (Currentwindow) =>{
     this.setState({Currentwindow: 'Insert'});
  }   
                                   
                                   
  backtoread = (Currentwindow) =>{
      this.setState({Currentwindow: 'Read'});
      this.handlechange();
  }

  logout = (Currentwindow) =>{
    this.setState({Currentwindow: 'Login'});
    
}




  gotoupdate = (Currentwindow) =>{
      this.setState({Currentwindow: 'Update'});

      //to fetch update api

      fetch('http://localhost:4000/updateData',{
        method: 'POST', 
        body: JSON.stringify(user),
        headers:{
          'Content-Type': 'application/json',
        }
      })
           .then( res=>res.json() )
             .then( data=>{
          console.log(data);
          this.setState({
            Users : data.recordset
          })
          console.log(this.state.Users);
        })
  
      




  }  

  deleteUser = (id) =>{
    let data ={
      id : id        
    }
      fetch('http://localhost:4000/deleteUserData', {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then( res=>res.json() )
      .then( data=>{
        this.backtoread()
          console.log(data);
      })
  }

  gotodelete = (id) =>{
    
    var txt;
    if (window.confirm("Do you want to delete this record")) {
         this.deleteUser(id);
    } else {
      console.log(txt = "You pressed Cancel!");
    }
  }

  

  
  
  render() {
    const {email, password} = this.state;
    const values = {email, password};
    let window=null; 

    

    if(this.state.Currentwindow === 'Login') {
        return (
          <div>
            <Login 
                switchtoread={this.backtoread}
                values={values}
                hchange={this.hchange}
                handlesubmit = {this.handlesubmit}
            />
          </div>
        )
    } else if(this.state.Currentwindow === 'Read') {
      return (<div>
      
        <table className="ui celled table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User First-Name</th>
            <th>User Last-Name</th>
            <th>User Email</th>
            <th>User Status</th>
            <th>User Type</th>
            <th>Delete</th>
            <th>Update</th>           
             <th>
            <Button onClick={this.insertuser}>Insert user</Button>
            <Button onClick={this.logout}>Logout</Button>
            </th>
 
          </tr>
        </thead>
        {<tbody>
         {
          this.state.Users.map((user, i ) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.Email}</td>
                <td>{user.IsStatus}</td>
                <td>{user.UserType}</td>
                <td><Button onClick={()=>this.gotodelete(user.id)}>Delete</Button></td>
                
                <td><Button onClick={this.gotoupdate}>Update</Button></td>
              </tr>
            )
          })
        }
         </tbody>}
        </table> 
        </div>
        )
    } else if(this.state.Currentwindow === 'Insert')
    {
      return (<div>
      <Insert click={this.backtoread} />
      </div>)
    }
    else if(this.state.Currentwindow === 'Update')
    {
      return (<div>
         <Update click={this.backtoread} />
        </div>)
    }
    else if(this.state.Currentwindow === 'Delete')
    {
      return (<div>
         <Delete/>
        </div>
      )
    } else {
      return null
    }
  }
}

export default App;