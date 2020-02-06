import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/userAction";

class Publicaciones extends React.Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }
  }
  render() {
    console.log(this.props);
    return (
      <>
        <h1>Publicaciones de </h1>
        <p>Publicaciones {this.props.match.params.id}</p>
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.user;
};

const mapDispatchToProps = {
  getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
