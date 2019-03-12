import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';




class Delete extends Component {

    constructor(props) {
        super(props);
        
        this.deleteUser = this.deleteUser.bind(this)
      }    

   
      deleteUser = (id) =>{
        return fetch('http://localhost:3000/deleteUserData', {
          method: 'POST', 
  body: JSON.stringify(),
  headers:{
    'Content-Type': 'application/json',
  }
})
.then( res => res.json())
.then( data=>{
      console.log(data);
    })
  }
    
    render() {
  
        return (
            <div>
            
          <Button onClick={this.deleteUser}>Delete</Button>
          
            </div>
            
            
        );
      }
}

export default Delete;

/*
deleteUser = (id) =>{
  return fetch('http://localhost:3000/deleteUserData', {
  method: 'POST', 
   body: JSON.stringify(),
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
            this.handlechange();
    console.log(this.state.Users);
             })

            }*/

            /* deleteUser = (id) =>{
    return fetch('http://localhost:3000/deleteUserData', {
    method: 'POST', 
     body: JSON.stringify(),
     headers:{
         'Content-Type': 'application/json',
             }
                                 })
      .then( res=>res.json() )
         .then( data=>{
            var users = [...this.state.Users];
               users = users.filter(user=>{
                 return user.id !==id
               })
          console.log(data);
           this.setState({
            Users : data.recordset
                        })
              this.backtoread();
      console.log(this.state.Users);
               })
  
              }*/


              /*
 deleteUser = (id) =>{
    return fetch('http://localhost:3000/deleteUserData', {
      method: 'POST',
       }).then(res=>res.json() ) 
       .then(data=>{
    this.setState({
      Users : data.recordset
      
  })
})
 }*/