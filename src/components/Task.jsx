import React from "react";
import { connect } from "react-redux";
import { getTasks } from "../actions/taskAction";
import Spinner from "./Spinner";
import Fatal from "./Fatal";

class Task extends React.Component {
  componentDidMount() {
    this.props.getTasks();
  }

  showTasksByUserId = userId => {
    const { tasks } = this.props;
    const taskByUserId = {
      ...tasks[userId]
    };
    return Object.keys(taskByUserId).map( taskId => {
      return (
        <div key={taskId}>
          <input type="checkbox" defaultChecked={taskByUserId[taskId].completed} />
          {taskByUserId[taskId].title}
        </div>
      );
    });
  };
  render() {
    const { tasks, loading, error } = this.props;
    if (error) return <Fatal message={error} />;
    if (loading) return <Spinner />;
    return Object.keys(tasks).map(userId => {
      return (
        <div key={userId}>
          <h2>Usuario {userId}</h2>
          <div className="task__container">
            {this.showTasksByUserId(userId)}
          </div>
        </div>
      );
    });
  }
}
const mapStateToProps = ({ task }) => task;
const mapDispatchToProps = {
  getTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
