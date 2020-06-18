import React from 'react';

import useForm from '../../hooks/form.js';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const TodoForm = props => {

  const { handleChange, handleSubmit } = useForm(props.handleSubmit);

  const courses = [
    'Code 201', 'Code 301', 'Code 401 (js)', 'Code 401 (py)', 'Code 401 (c#)', 'Code 401 (java)', 'Ops 201', 'Ops 301', 'Ops 401',
  ];

  return (
    <>
      <Accordion>
        <Card>
          <Accordion.Toggle style={{cursor:'pointer'}} as={Card.Header} variant="link" eventKey="0">
              Request Help
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Form onSubmit={handleSubmit}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Brief Description</Form.Label>
                    <Form.Control onChange={handleChange} name="issue" type="text" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control onChange={handleChange} name="student" type="text" placeholder="Student Name" />
                  </Form.Group>

                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Label>Course</Form.Label>
                    <Form.Control as="select" name="course" onChange={handleChange} custom>
                      <option value="">Select Course Type</option>
                      {courses.map(course =>
                        <option key={course}>{course}</option>,
                      )}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Assignment</Form.Label>
                    <Form.Control onChange={handleChange} name="assignment" type="text" placeholder="i.e. Lab ## or Challenge ##" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Your Remo Location</Form.Label>
                    <Form.Control onChange={handleChange} name="location" type="text" placeholder="i.e. 1st Floor, Table 3" />
                  </Form.Group>

                  <Button variant="primary" type="submit">Add Item</Button>
                </Card.Body>
              </Card>

            </Form>
          </Accordion.Collapse>
        </Card>
      </Accordion>



    </>
  );
};

export default TodoForm;
