import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { message } from "antd";

function App() {
  const [spinner, setSpinner] = useState(false);
  const [task, setTask] = useState("");
  const [todoLists, setTodoLists] = useState(null);
  const [updateTaskBtn, setUpdateTaskBtn] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [editTaskId, setEditTaskId] = useState("");

  //success notification
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  //error notification
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  //warning notification
  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/todo/all-todos")
      .then((res) => {
        setTodoLists(res.data.allTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      error("Task can not be empty");
      setTask("");
    } else {
      setSpinner(true);
      axios
        .post(
          "http://localhost:3000/api/todo/add-todo",
          {
            task,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          success(res.data.message);
          setTodoLists(res.data.allTodos);
          setTask("");
          setSpinner(false);
        })
        .catch((err) => {
          console.log(err);
          error(err.data.message);
          setTask("");
          setSpinner(false);
        });
    }
  };

  const handleDeleteTodo = (taskId) => {
    axios
      .post(
        "http://localhost:3000/api/todo/remove-todo",
        {
          taskId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        success(res.data.message);
        setTodoLists(res.data.allTodos);
      })
      .catch((err) => {
        console.log(err);
        error(err.data.message);
      });
  };

  const handleChangeStatus = (taskId, e) => {
    axios
      .post(
        "http://localhost:3000/api/todo/change-todo-status",
        {
          taskId,
          status: e.target.checked ? "completed" : "pending",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTodoLists(res.data.allTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      error("Task can not be empty");
      setTask("");
    } else {
      setSpinner(true);
      axios
        .post(
          "http://localhost:3000/api/todo/edit-task",
          {
            editTaskId,
            task,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          success(res.data.message);
          setUpdateTaskBtn(false);
          setTask("");
          setSpinner(false);
          setTodoLists(res.data.allTodos);
        })
        .catch((err) => {
          console.log(err);
          setUpdateTaskBtn(false);
          setTask("");
          setSpinner(false);
        });
    }
  };

  return (
    <div className="app">
      {contextHolder}
      <main>
        <header>
          <h3>TODO APP</h3>
          <h1 className="header-title">
            {new Date().toString().split(" ").slice(0, 4).join(" ")}
          </h1>
          <div className="task-counts">{todoLists?.length} tasks</div>
          <form onSubmit={updateTaskBtn ? handleEditTask : handleAddTodo}>
            <input
              type="text"
              name=""
              id=""
              placeholder="ADD NEW TASK"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit">
              <div
                className="spinner"
                style={{ display: spinner ? "block" : "none" }}
              ></div>
              <span style={{ display: spinner ? "none" : "block" }}>
                {updateTaskBtn ? "UPDATE" : "ADD"}
              </span>
            </button>
          </form>
        </header>
        <div className="todo-lists">
          <ul>
            {todoLists ? (
              todoLists.map((todoList) => (
                <li key={todoList._id}>
                  <div className="task-info">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(e) => handleChangeStatus(todoList._id, e)}
                    />
                    <h5
                      style={{
                        textDecoration:
                          todoList.status === "completed" ? "line-through" : "",
                        color: todoList.status === "completed" ? "red" : "",
                        fontWeight:
                          todoList.status === "completed" ? "900" : "",
                        fontStyle:
                          todoList.status === "completed" ? "italic" : "",
                      }}
                    >
                      {todoList.task}
                    </h5>
                  </div>
                  <div className="task-actions">
                    <FiEdit
                      className="edit-icon"
                      onClick={() => {
                        setTask(todoList.task);
                        setEditTaskId(todoList._id);
                        setUpdateTaskBtn(true);
                      }}
                    />
                    <MdDelete
                      className="delete-icon"
                      onClick={() => handleDeleteTodo(todoList._id)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
