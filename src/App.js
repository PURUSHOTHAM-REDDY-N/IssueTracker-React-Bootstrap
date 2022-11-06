import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Icon } from "react-icons-kit";
import { trash } from "react-icons-kit/feather/trash";
import { edit } from "react-icons-kit/ionicons/edit";
import Table from 'react-bootstrap/Table';

//getting values from local storage

const getDataFromLs = () => {
  const issue = localStorage.getItem("issue");
  if (issue) {
    return JSON.parse(issue);
  } else {
    return [];
  }
};

export default function App() {
  const [data, setData] = useState(getDataFromLs());

  //values
  const [values, setValues] = useState({
    title: "",
    owner: "",
    status: "",
    effort: "",
    due: "",
    date: new Date().toLocaleDateString(),
    btn: "Add Issue",
  });

  //seting values
  const settingValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //filter

  const [filter, setFilter] = useState("0");

  const submit = (e) => {
    setFilter("0");

    e.preventDefault();

    console.log(values);

    setData([...data, values]);

    setValues({
      title: "",
      owner: "",
      status: "",
      effort: "",
      due: "",
      date: new Date().toLocaleDateString(),
      btn: "Add Issue",
    });
  };

  //delete issues from localstorage
  const deleteIssue = (title) => {
    const filteredIssue = data.filter((element, index) => {
      return element.title !== title;
    });
    setData(filteredIssue);
  };

  //edit Issue

  const editIssue = (data) => {
    setValues({
      title: data.title,
      owner: data.owner,
      status: data.status,
      effort: data.effort,
      due: data.due,
      date: new Date().toLocaleDateString(),
      btn: "Update Issue",
    });
    deleteIssue(data.title);
  };

  // saving data in local storage

  useEffect(() => {
    localStorage.setItem("issue", JSON.stringify(data));
  }, [data]);

  //filtering items

  const itemFilter = (e) => {
    e.preventDefault();
    setFilter("0");
    setSearch("");
  };

  //filter through search

  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="Issue-Container">
        <div className="Issue-form">
          <h2 style={{ color: "red", textAlign: "center" }}>Issue Tracker</h2>
          <Form onSubmit={submit}>
            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                name="title"
                onChange={(e) => settingValues(e)}
                type="text"
                value={values.title}
                placeholder="Title"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                required
                name="owner"
                type="text"
                value={values.owner}
                onChange={(e) => settingValues(e)}
                placeholder="Owner Name"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={values.status}
                onChange={(e) => settingValues(e)}
                name="status"
                required
                as="select"
                aria-label="Default select example"
              >
                <option value="">Select</option>
                <option value="New">New</option>
                <option value="Assaigned">Assaigned</option>
                <option value="Fixed">Fixed</option>
                <option value="Closed">Closed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Effort(Days)</Form.Label>
              <Form.Control
                name="effort"
                required
                value={values.effort}
                type="number"
                onChange={(e) => settingValues(e)}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                name="due"
                required
                value={values.due}
                type="date"
                onChange={(e) => settingValues(e)}
              />
            </Form.Group>

            <Button
              style={{ padding: "5px 40px" }}
              variant="primary"
              type="submit"
            >
              {values.btn}
            </Button>
          </Form>
        </div>
      </div>

      <div className="data" id="databox">
        {/* // starts rendering data length > 0 */}
        <div className="view-container">
          {data.length > 0 && (
            <>
              <div className="filter">
                <Form onSubmit={itemFilter}>
                  <Form.Group className="mb-4 m-5 mt-4">
                    <Row>
                      <Col>
                        <Form.Control
                          name="search"
                          onChange={(event) => setSearch(event.target.value)}
                          type="text"
                          value={search}
                          placeholder="search title"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          onChange={(e) => setFilter(e.target.value)}
                          required
                          value={filter}
                          as="select"
                        >
                          <option value="0">status</option>
                          <option value="New">New</option>
                          <option value="Assaigned">Assaigned</option>
                          <option value="Fixed">Fixed</option>
                          <option value="Closed">Closed</option>
                        </Form.Control>
                      </Col>
                      <Col>
                        <Button type="submit">Reset</Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </div>

              <div className="overflow-auto">

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Owner</th>
                      <th>Created</th>
                      <th>Status</th>
                      <th>Effort</th>
                      <th>Due Date</th>
                      <th>Delete</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .filter((data) =>
                        filter === "0"
                        ? data.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                        : data.status === filter &&
                        data.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                        )
                        .map((data, index) => (
                          <tr key={data.title}>
                          <td>{index + 1}</td>
                          <td>{data.title}</td>
                          <td>{data.owner}</td>
                          <td>{data.date}</td>
                          <td>{data.status}</td>
                          <td>{data.effort}</td>
                          <td>{data.due}</td>
                          <td
                            className="delete-btn"
                            onClick={() => deleteIssue(data.title)}
                            >
                            <Icon icon={trash} />
                          </td>
                          <td
                            className="delete-btn"
                            onClick={() => editIssue(data)}
                            >
                            <Icon icon={edit} />
                          </td>
                        </tr>
                      ))}

                    
                  </tbody>
                </Table>
                </div>
              
              <button
                className="btn btn-danger btn-md"
                onClick={() => setData([])}
              >
                Remove All
              </button>
            </>
          )}
          {data.length < 1 && <div>No Issues are added yet</div>}
        </div>
      </div>
    </div>
  );
}
