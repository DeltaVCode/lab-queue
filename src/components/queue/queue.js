import React, { useEffect, useState, useCallback, useContext } from 'react';

import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { When } from 'react-if';

import { LoginContext } from '../auth/context.js';
import Auth from '../auth/auth.js';
import Login from '../auth/login.js';
import Form from './form.js';
import List from './list.js';

import useSocket from '../../hooks/socket';

import useAjax from '../../hooks/ajax.js';

const API = process.env.REACT_APP_API;

const Queue = () => {

  const authContext = useContext(LoginContext);
  const { subscribe } = useSocket();
  const { request } = useAjax();

  const [list, setList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [open, setOpen] = useState(false);

  const addSupportRequest = async (supportRequest) => {

    // Defaults.
    supportRequest.student = authContext.user.name;
    supportRequest.course = supportRequest.course || localStorage.getItem('course');
    supportRequest.assignment_type = supportRequest.assignment_type || "Lab";

    // Store anything valid to LS for next time
    supportRequest.course && localStorage.setItem('course', supportRequest.course);

    // Combined answer
    supportRequest.location = `Floor ${supportRequest.floor}, ${supportRequest.table}`;

    // Set the create date
    supportRequest.createTime = Date.now();

    // Re-Read/Render
    readDefaults();

    const options = {
      method: 'post',
      url: `${API}/api/v1/queue`,
      data: supportRequest,
    };
    request(options);
  };

  const updateSupportRequest = (id, data) => {
    const url = `${API}/api/v1/queue/${id}`;
    const method = "put";
    const options = { method, url, data };
    request(options);
  }

  const completeSupportRequest = async (id) => {
    const data = {
      status: "complete",
      completeTime: Date.now()
    }
    updateSupportRequest(id, data);
  };

  const assignSupportRequest = async (id) => {
    const data = {
      status: 'in-progress',
      assignedTime: Date.now(),
      assignedTo: authContext.user.name
    };
    updateSupportRequest(id, data);
  };

  const unAssignSupportRequest = async (id) => {
    const data = {
      status: 'pending',
      assignedTime: null,
      assignedTo: ''
    };
    updateSupportRequest(id, data);
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

  const readDefaults = () => {
    const savedCourse = localStorage.getItem('course');
    setCourse(savedCourse);
  };

  // Runs on app load
  useEffect(() => {
    document.title = `Virtual Campus`;
    getQueue();
    getCourses();
    readDefaults();
    subscribe('database', (payload) => {
      setList(payload.results);
    });
    // Forgive me, for I have sinned ...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (

    <section id="queue" className={open ? 'open' : ''}>
      <Button onClick={() => setOpen(!open)} id="handle" variant="light">?</Button>
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Help Queue ({list.filter(supportRequest => !supportRequest.complete).length})</Navbar.Brand>
          <Login />
        </Navbar>
      </header>

      <Auth>
        <Container>
          <Row style={{ flexDirection: 'column' }}>

            <When condition={!authContext.can('delete')}>
              <Col md="auto" style={{ marginTop: '1rem' }}>
                <Form courses={courses} course={course} addRequest={addSupportRequest} />
              </Col>
            </When>

            <Col style={{ marginTop: '1rem' }}>
              <List
                list={list}
                handleAssign={assignSupportRequest}
                handleUnAssign={unAssignSupportRequest}
                handleComplete={completeSupportRequest}
              />
            </Col>
          </Row>
        </Container>
      </Auth>
    </section>
  );
};

export default Queue;
