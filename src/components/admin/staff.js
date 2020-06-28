import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'

import useAjax from '../../hooks/ajax.js';
import useForm from '../../hooks/form.js';

const API = process.env.REACT_APP_API;

const Staff = () => {

  const [staffList, setStaffList] = useState([]);

  const { request, response } = useAjax();

  const { handleChange, handleSubmit } = useForm(_add);

  function _add(data) {
    const addRequest = {
      url: `${API}/api/v1/staff`,
      method: 'post',
      data: data
    }
    request(addRequest);
  }

  function _delete(id) {
    const deleteRequest = {
      url: `${API}/api/v1/staff/${id}`,
      method: 'delete'
    }
    request(deleteRequest);
  }

  function _getAll() {
    const req = {
      url: `${API}/api/v1/staff`,
      method: 'get'
    }
    request(req);
  }

  // On mount ... get the list
  useEffect(() => {
    _getAll();
  }, []);

  useEffect(() => {
    if (response.count >= 0) {
      setStaffList(response.results);
    }
    else {
      _getAll();
    }
  }, [response]);

  return (
    <>
      <section>

        <header>
          <h2>
            Staff List
          </h2>
        </header>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Add Staff Member</Form.Label>
            <Form.Text className="text-muted">
              Enter the email address for the user that is used in slack
            </Form.Text>
            <Form.Control
              name="username"
              type="text"
              placeholder="you@codefellows.com"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>

        <ListGroup>
          {staffList.map((person) =>
            <ListGroup.Item variant="warning" key={person.username}>
              {person.username}
              <FontAwesomeIcon
                color="red"
                size="lg"
                style={{ cursor: "pointer", paddingTop: "8px" }}
                pull="right"
                icon={faUserTimes}
                onClick={() => _delete(person._id)} />
            </ListGroup.Item>
          )}
        </ListGroup>

      </section>
    </>
  );
};

export default Staff;
