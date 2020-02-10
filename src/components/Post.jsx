import React from "react";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import Fatal from "../components/Fatal";
import { getUsers } from "../actions/userAction";
import { getPostsById, openClose } from "../actions/postAction";

class Post extends React.Component {
  async componentDidMount() {
    const {
      getUsers,
      getPostsById,
      match: {
        params: { id }
      }
    } = this.props;
    if (!this.props.user.users.length) {
      await getUsers();
    }
    getPostsById(id);
  }
  render() {
    const {
      user,
      post,
      match: {
        params: { id }
      }
    } = this.props;

    if (user.error) return <Fatal message={user.error} />;
    if (post.error) return <Fatal message={post.error} />;
    if (
      user.loading ||
      post.loading ||
      !user.users.length ||
      !post.posts.length
    ) {
      return <Spinner />;
    }
    return (
      <>
        <h1>Publicaciones de {user.users[id].name} </h1>
        {"postIndex" in user.users[id] &&
          post.posts[user.users[id].postIndex].map((post, index) => (
            <div key={index} className="post_Title" onClick={()=>this.props.openClose(user.users[id].postIndex, index)}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              {(post.isOpen) ? 'TRUE' : 'FALSE'}
            </div>
          ))}
      </>
    );
  }
}

const mapStateToProps = ({ user, post }) => {
  return {
    user,
    post
  };
};

const mapDispatchToProps = {
  getUsers,
  getPostsById,
  openClose
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
