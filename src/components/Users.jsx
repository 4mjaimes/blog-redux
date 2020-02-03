import React from "react";
import { connect } from "react-redux";
import * as userAction from "../actions/userAction";

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  ponerFilas = () =>
    this.props.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));
  render() {
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

export default connect(mapStateToProps, userAction)(Users);
