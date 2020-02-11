import React from "react";
import { connect } from 'react-redux';
import Spinner from './Spinner';
import Fatal from './Fatal';

const Comments = props => {
  if(props.commentsError)
    return <Fatal message={props.commentsError} />
  if(props.commentsLoading && !props.content.length)
    return <Spinner />
  return(
    <ul>
      {props.content.map((comment, index) => (
        <li key={index}>
          <b>{comment.email}</b>
          <br />
          {comment.body}
        </li>
      ))}
    </ul>
  )
};

const mapStateToProps = ({post}) => post;

export default connect(mapStateToProps, null)(Comments);
