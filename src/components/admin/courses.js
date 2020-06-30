import React, { useEffect, useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTimes } from '@fortawesome/free-solid-svg-icons'

import useAjax from '../../hooks/ajax.js';
import useForm from '../../hooks/form.js';

const API = process.env.REACT_APP_API;

const Courses = () => {

  const [coursesList, setCoursesList] = useState([]);

  const { request, response } = useAjax();

  const { handleChange, handleSubmit } = useForm(_add);

  function _add(data) {
    const addRequest = {
      url: `${API}/api/v1/courses`,
      method: 'post',
      data: data
    }
    request(addRequest);
  }

  function _delete(id) {
    const deleteRequest = {
      url: `${API}/api/v1/courses/${id}`,
      method: 'delete'
    }
    request(deleteRequest);
  }

  const _getAll = useCallback(() => {
    const req = {
      url: `${API}/api/v1/courses`,
      method: 'get'
    }
    request(req);
  }, [request]);

  // On mount ... get the list
  useEffect(() => {
    _getAll();
  }, [_getAll]);

  useEffect(() => {
    if (response.count >= 0) {
      setCoursesList(response.results);
    }
    else {
      _getAll();
    }
  }, [_getAll, response]);

  return (
    <>
      <section>

        <header>
          <h2>
            Running Courses List
          </h2>
        </header>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Add Course</Form.Label>
            <Form.Control
              name="code"
              type="text"
              placeholder="Course Code"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>

        <ListGroup>
          {coursesList.map((course) =>
            <ListGroup.Item variant="warning" key={course.code}>
              {course.code}
              <FontAwesomeIcon
                color="red"
                size="lg"
                style={{ cursor: "pointer", paddingTop: "8px" }}
                pull="right"
                icon={faUserTimes}
                onClick={() => _delete(course._id)} />
            </ListGroup.Item>
          )}
        </ListGroup>

      </section>
    </>
  );
};

export default Courses;
