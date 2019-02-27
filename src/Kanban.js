import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import KanbanColumn from "./KanbanColumn";
import KanbanItem from "./KanbanItem";
import update from "immutability-helper";
const tasks = [
  { id: 1, title: "First Task", status: "backlog" },
  { id: 2, title: "Second Task", status: "backlog" },
  { id: 3, title: "Third Task", status: "backlog" },
  { id: 4, title: "Fourth Task", status: "new" },
  { id: 5, title: "Fifth Task", status: "new" },
  { id: 6, title: "Sixth Task", status: "wip" },
  { id: 7, title: "Seventh Task", status: "review" },
  { id: 8, title: "Eighth Task", status: "review" },
  { id: 9, title: "Ninth Task", status: "done" },
  { id: 10, title: "Tenth Task", status: "done" }
];

const channels = ["backlog", "new", "wip", "review", "done"];

const labelsMap = {
  backlog: "Backlog",
  new: "To Do",
  wip: "In Progress",
  review: "Review",
  done: "Done"
};

class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks
    };
  }

  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find(task => task.id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task }
    });
    this.setState({ tasks: newTasks });
  };

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <header> Kanban Board </header>
        <div
          className="board"
          style={{
            display: "flex",
            margin: "0 auto",
            width: "90vw",
            fontFamily: 'Arial, "Helvetica Neue", sans-serif'
          }}
        >
          {channels.map(channel => (
            <KanbanColumn status={channel}>
              <div
                className="column"
                style={{
                  minWidth: 200,
                  width: "18vw",
                  height: "80vh",
                  margin: "0 auto",
                  backgroundColor: "#FCC8B2"
                }}
              >
                <div
                  className="columnHead"
                  style={{
                    textAlign: "center",
                    padding: 10,
                    fontSize: "1.2em",
                    backgroundColor: "#C6D8AF"
                  }}
                >
                  {labelsMap[channel]}
                </div>
                <div className="task">
                  {tasks
                    .filter(task => task.status === channel)
                    .map(task => (
                      <KanbanItem id={task.id} onDrop={this.update}>
                        <div
                          style={{
                            padding: 10,
                            margin: 10,
                            fontSize: "0.8em",
                            cursor: "pointer",
                            backgroundColor: "white"
                          }}
                        >
                          {task.title}
                        </div>
                      </KanbanItem>
                    ))}
                </div>
              </div>
            </KanbanColumn>
          ))}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);
