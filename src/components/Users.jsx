import React from "react";
import axios from "axios";
import { connect } from "react-redux";

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
    console.log(this.props);
    return (
      <div>
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

const mapStateToProps = reducers => {
  return reducers.user;
};

export default connect(mapStateToProps, {})(Users);
