import React, { useEffect, useState } from "react";
import { createtodo, deletetodo, edittodo, gettodo } from "../Services/Allapi";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

const Home = () => {
  const [todoData, setTodoData] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [editData, setEditData] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let apiResponse = await gettodo();
    //console.log(apiResponse.data)
    setTodoData(apiResponse.data);
  };

  const createClick = async () => {
    if (inputVal == "") {
      Swal.fire({
        title: "Oops!",
        text: "Book name cannot be empty!",
        icon: "warning",
      });
      return;
    }
    let reqBody = {
      todo: inputVal,
    };
    let apiResponse = await createtodo(reqBody);
    // console.log(apiResponse)
    if (apiResponse.status === 201) {
      Swal.fire({
        title: "Success!",
        text: "Book added successfully!",
        icon: "success",
      });
      setInputVal("");
      loadData();
    }
  };
  const deleteClick = async (id) => {
    let apiResponse = await deletetodo(id);
    if (apiResponse.status == 200) {
      Swal.fire({
        title: "success",
        text: "successfully deleted",
        icon: "success",
      });
    }
    loadData();
  };
  const onEditClickShow = (data) => {
    console.log(data);
    setEditData(data);
    setShow(true);
  };
  const onEditSaveClick = async () => {
    let reqBody = {
      todo: editData.todo,
    };
    let apiResponse = await edittodo(editData.id, reqBody);
    if (apiResponse.status == 200) {
      Swal.fire({
        title: "success",
        text: "successfully saved",
        icon: "success",
      });
    }
    // console.log(apiResponse)
    setShow(false);
    loadData();
  };
  return (
    <div>
      <h1 className="text-center">Create Your TODO</h1>

      <div>
        <input
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
          placeholder="enter Todo"
        />
        <button onClick={createClick} className="btn btn-primary">
          ADD ToDo
        </button>
      </div>

      {todoData.map((e) => (
        <div>
          <h1>{e.todo}</h1>
          <button onClick={() => onEditClickShow(e)}>Edit</button>
          <button onClick={() => deleteClick(e.id)}>Delete</button>
        </div>
      ))}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={editData.todo}
            onChange={(e) => setEditData({ ...editData, todo: e.target.value })}
            className="form-control"
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onEditSaveClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
