import React, { useState } from 'react';

import { When } from 'react-if';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import useForm from '../../hooks/form.js';

const QueueForm = ({ courses, course, name, addRequest }) => {

  const [open, setOpen] = useState(false);
  const { handleChange, handleSubmit } = useForm(addRequest);

  const formSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    handleSubmit(e);
  }

  let assignmentNumbers = new Array(45).fill(0).map((val, idx) => idx.toString().padStart(2, '0'));

  return (
    <>
      <Button variant="secondary" block onClick={() => setOpen(!open)}>
        Request Help
        <FontAwesomeIcon style={{ paddingTop: "4px" }} size="lg" pull="right" icon={open ? faAngleUp : faAngleDown} />
      </Button>

      <div className={`help-form open-${open}`}>
        <Form onSubmit={formSubmit}>
          <Card style={{ borderLeft: 'none', borderRight: 'none', borderBotom: 'none' }}>
            <Card.Body>

              <Form.Group controlId="formStudent">
                <Form.Label>Your Name:</Form.Label>
                <Form.Control onChange={handleChange} name="student" type="text" placeholder="Full Name" defaultValue={name} required={true} />
              </Form.Group>

              <When condition={!!(course && courses.length)}>
                <Form.Group controlId="formCourse">
                  <Form.Label>Course</Form.Label>
                  <Form.Control as="select" name="course" onChange={handleChange} required={true} defaultValue={course}>
                    <option value="">Select Your Course</option>
                    {courses.map(course =>
                      <option key={course.code} value={course.code}>{course.code}</option>,
                    )}
                  </Form.Control>
                </Form.Group>
              </When>

              <Form.Group controlId="formAssignment">
                <Form.Label>Assignment Type</Form.Label>
                <ToggleButtonGroup required name="assignment_type" toggle>
                  <ToggleButton
                    type="checkbox"
                    variant="light"
                    value="Lab"
                    onChange={handleChange}
                  >Lab</ToggleButton>
                  <ToggleButton
                    type="checkbox"
                    variant="light"
                    value="Code Challenge"
                    onChange={handleChange}
                  >Code Challenge</ToggleButton>
                  <ToggleButton
                    type="checkbox"
                    variant="light"
                    value="Other"
                    onChange={handleChange}
                  >Other</ToggleButton>
                </ToggleButtonGroup>

                <Form.Control
                  name="assignment_number"
                  as="select"
                  size="md"
                  onChange={handleChange}
                  style={{ display: "inline-block", width: "auto" }}
                  required
                >
                  <option value="">##</option>
                  {assignmentNumbers.map(val => <option key={val}>{val}</option>)}
                </Form.Control>

              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label>Your Remo Location</Form.Label>
                <Form.Control onChange={handleChange} name="location" type="text" placeholder="i.e. 1st Floor, Table 3" required={true} />
              </Form.Group>

              <Form.Group controlId="formDesc">
                <Form.Label>Brief Description</Form.Label>
                <Form.Control onChange={handleChange} name="description" type="text" required={true} />
              </Form.Group>

              <Button variant="primary" type="submit">Request Help</Button>
            </Card.Body>
          </Card>

        </Form>
      </div>
    </>
  );
};

export default QueueForm;
