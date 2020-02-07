import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Fatal from "./Fatal";
import * as userAction from "../actions/userAction";

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    console.log(this.props);
    if (this.props.loading) return <Spinner />;
    if (this.props.error) return <Fatal message={this.props.error} />;
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
          <tbody>
            {this.props.users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>
                  <Link to={`/post/${index}`}>
                    <div className="eye icon"></div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.user;
};

export default connect(mapStateToProps, userAction)(Users);
