import React, { Component } from 'react'

import loginheader from '../Beautification/Beautification.css';
import between from '../Beautification/Beautification.css';
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react'
import between2 from '../Beautification/Beautification.css';
import backgoundcolor from '../Beautification/Beautification.css';
import { exists } from 'fs';

class Login extends Component {


  constructor(props){
    super(props);

    this.state = {
        fields: {},
        errors: {}
    }
 }


 handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  //Password
  if(!fields["Password"]){
     formIsValid = false;
     errors["name"] = "Cannot be empty";
  }

 // if(typeof fields["name"] !== "undefined"){
    // if(!fields["name"].match(/^[a-zA-Z]+$/)){
      //  formIsValid = false;
    //    errors["name"] = "Only letters";
   //  }        
 // }

  //Email
  if(!fields["Email"]){
     formIsValid = false;
     errors["Email"] = "Cannot be empty";
  }

  if(typeof fields["Email"] !== "undefined"){
     let lastAtPos = fields["Email"].lastIndexOf('@');
     let lastDotPos = fields["Email"].lastIndexOf('.');

     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["Email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["Email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["Email"] = "Email is not valid";
      }
 }  

 this.setState({errors: errors});
 return formIsValid;
}


    render() {
      const { values } = this.props;
        return (

            <div>
            <div className="loginheader">
            <Header></Header>
            <h2>Welcome To User Management</h2>
            </div>
            <div className="between"></div>
            <div className="between2"></div>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
             <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
            <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name = "email" value={values.email} 
            onChange={this.props.hchange('email')}/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name = "password"
              value={values.password}
              onChange={this.props.hchange('password')}
            />
          </Segment>
        </Form>
        </Grid.Column>
         </Grid>
         <div className = "backgoundcolor">
         <Button color='teal' onClick={this.props.handlesubmit}>Login</Button>
         </div>

            </div>
        );
      }

}

export default Login;