import React, { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Auth from '../auth/auth.js';
import Login from '../auth/login.js';
import Form from './form.js';
import List from './list.js';

import useSocket from '../../hooks/socket';

import useAjax from '../../hooks/ajax.js';

const API = process.env.REACT_APP_API;

const Queue = () => {

  const { subscribe } = useSocket();

  const { request } = useAjax();

  const [list, setList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [open, setOpen] = useState(false);

  const addSupportRequest = async (supportRequest) => {

    // Default to what's in LS if not from the form
    supportRequest.student = supportRequest.student || localStorage.getItem('name');
    supportRequest.course = supportRequest.course || localStorage.getItem('course');

    // Store anything valid to LS for next time
    supportRequest.student && localStorage.setItem('name', supportRequest.student);
    supportRequest.course && localStorage.setItem('course', supportRequest.course);

    // Re-Read/Render
    readDefaults();

    const options = {
      method: 'post',
      url: `${API}/api/v1/queue`,
      data: supportRequest,
    };
    request(options);
  };

  const deleteSupportRequest = async (id) => {
    const options = {
      method: 'delete',
      url: `${API}/api/v1/queue/${id}`,
    };
    request(options);
  };

  const toggleComplete = async (id, user) => {

    const supportRequest = list.filter(i => i._id === id)[0] || {};

    if (supportRequest._id) {
      console.log('user', user);
      const options = {
        method: 'put',
        url: `${API}/api/v1/queue/${id}`,
        data: { complete: !supportRequest.complete, assignedTo: user },
      };
      request(options);
    }

  };

  const getQueue = useCallback(async () => {
    const options = {
      method: 'get',
      url: `${API}/api/v1/queue/refresh`,
    };
    request(options);
  }, [request]);

  const getCourses = useCallback(async () => {
    const response = await axios.get(`${API}/api/v1/courses`);
    const list = response.data.results || [];
    list.sort((a, b) => {
      return a.code === b.code ? 0 : a.code > b.code ? 1 : -1;
    });
    setCourses(list);
  }, []);

  function readDefaults() {
    const savedName = localStorage.getItem('name');
    const savedCourse = localStorage.getItem('course');
    setName(savedName);
    setCourse(savedCourse);
  }

  // Runs on app load
  useEffect(() => {
    document.title = `Virtual Campus`;
    getQueue();
    getCourses();
    readDefaults();
    subscribe('database', (payload) => {
      setList(payload.results);
    });
  }, []);


  return (

    <section id="queue" className={open ? 'open' : ''}>
      <Button onClick={() => setOpen(!open)} id="handle" variant="light">?</Button>
      <header>
        <Navbar bg="dark" variant="dark" justify-content-between>
          <Navbar.Brand href="#home">Help Queue ({list.filter(supportRequest => !supportRequest.complete).length})</Navbar.Brand>
          <Login />
        </Navbar>
      </header>

      <Auth>
        <Container>
          <Row style={{ flexDirection: 'column' }}>
            <Col md="auto" style={{ marginTop: '1rem' }}>
              <Form courses={courses} course={course} name={name} addRequest={addSupportRequest} />
            </Col>
            <Col style={{ marginTop: '1rem' }}>
              <List
                list={list}
                handleComplete={toggleComplete}
                handleDelete={deleteSupportRequest}
              />
            </Col>
          </Row>
        </Container>
      </Auth>
    </section>
  );
};

export default Queue;
