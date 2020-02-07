import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/userAction";
import { getPost } from "../actions/postAction";

class Post extends React.Component {
  componentDidMount() {
    if (!this.props.user.users.length) {
      this.props.getUsers();
    }
  }
  render() {
    return (
      <>
        <h1>Publicaciones de </h1>
        <p>Publicaciones {this.props.match.params.id}</p>
      </>
    );
  }
}

const mapStateToProps = ({user, post}) => {
  return {
    user,
    post
  }
};

const mapDispatchToProps = {
  getUsers,
  getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
