import React, { components } from 'react'

class Read extends components {
    render() {
        return (
          
          <tr>
          <td data-label="User ID"><h4>{this.props.user.id}</h4></td>
          <td data-label="User First-Name"><h4>{this.props.user.first_name}</h4></td>
          <td data-label="User Last-Name"><h4>{this.props.user.last_name} </h4></td>
          <td data-label="User Email"><h4>{this.props.user.Email}</h4></td>   
          <td data-label="User Status"><h4>{this.props.user.IsStatus}</h4></td>
          <td data-label="User Type"><h4>{this.props.user.UserType}</h4></td>                                                        
          </tr>

        );
      }

}

export default Read;





