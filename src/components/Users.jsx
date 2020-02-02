import React from "react";
import axios from "axios";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  getUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.setState({
        users: response.data
      });
    } catch (error) {
      console.log("Error -> ", error);
    }
  };

  componentDidMount() {
    this.getUsers();
  }
  ponerFilas = () =>
    this.state.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));
  render() {
    return (
      <div className="margin">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}

export default Users;
