import React, { useEffect, useState, useCallback } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from './form.js';
import List from './list.js';

import useAjax from '../../hooks/ajax.js';

const API = process.env.REACT_APP_API;

const Queue = () => {

  const {request, response} = useAjax();

  const [list, setList] = useState([]);

  const addItem = async (item) => {
    const options = {
      method: 'post',
      url: `${API}/api/v1/queue`,
      data: item,
    };
    request(options);
  };

  const deleteItem = async (id) => {
    const options = {
      method: 'delete',
      url: `${API}/api/v1/queue/${id}`,
    };
    request(options);
  };

  const toggleComplete = async (id) => {

    const item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      const options = {
        method: 'put',
        url: `${API}/api/v1/queue/${id}`,
        data: { complete: !item.complete },
      };
      request(options);
    }

  };

  const getQueue = useCallback( async () => {
    const options = {
      method: 'get',
      url: `${API}/api/v1/queue`,
    };
    request(options);
  }, [request]);


  // Any time the "response" changes (the hook finds data) this effect runs
  // If response has a new list, it redraws it.
  // If not (assume it's a post/put/delete) and re-fetch the whole list
  useEffect( () => {
    if ( response.results ) {
      response.results && setList(response.results);
    }
    else {
      getQueue();
    }
  }, [response, getQueue, setList]);

  useEffect(() => {
    let incomplete = list.filter(item => !item.complete).length;
    document.title = `To Do List: ${incomplete}`;
  });

  // Runs on app load
  useEffect( () => {
    getQueue();
  }, [getQueue]);

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Help Queue ({list.filter(item => !item.complete).length})</Navbar.Brand>
        </Navbar>
      </header>

      <Container>
        <Row style={{flexDirection:'column'}}>
          <Col md="auto" style={{marginTop: '1rem'}}>
            <Form handleSubmit={addItem} />
          </Col>
          <Col style={{marginTop: '1rem'}}>
            <List
              list={list}
              handleComplete={toggleComplete}
              handleDelete={deleteItem}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Queue;
