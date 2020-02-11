import React from "react";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import Fatal from "../components/Fatal";
import Comments from "../components/Comments";
import { getUsers } from "../actions/userAction";
import { getPostsById, openClose, getComments } from "../actions/postAction";

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
  showComments = (userId, index, comments) => {
    this.props.openClose(userId, index);
    if(!comments.length)
      this.props.getComments(userId, index);
  };
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
            <div key={index} className="post_Title" onClick={()=>this.showComments(user.users[id].postIndex, index, post.comments)}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              {(post.isOpen) ? <Comments content={post.comments} /> : null}
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
  openClose,
  getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
