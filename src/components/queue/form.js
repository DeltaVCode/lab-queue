import React, { useState, useContext } from 'react';

import { When } from 'react-if';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { LoginContext } from '../auth/context.js';
import useForm from '../../hooks/form.js';


const tables = [];
for (let x = 1; x <= 15; x++) {
  tables.push(`Lab Table ${x}`);
}

const QueueForm = ({ courses, course, name, addRequest }) => {

  const authContext = useContext(LoginContext);
  const [open, setOpen] = useState(false);
  const [classRequired, setClassRequired] = useState(true);
  const { handleChange, handleSubmit } = useForm(addRequest);

  const formSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    handleSubmit(e);
  }

  // Conditionally set the assignment number
  const selectAssignment = (e) => {
    if (e.target.value === "Other") { setClassRequired(false); }
    else { setClassRequired(true); }
    // hand off to the actual form handler
    handleChange(e);
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
                <Form.Label>{authContext.user.name}</Form.Label>
              </Form.Group>

              <When condition={!!(courses.length)}>
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
                <ToggleButtonGroup required type="radio" name="assignment_type" defaultValue="Lab" toggle>
                  <ToggleButton
                    type="checkbox"
                    variant="light"
                    value="Lab"
                    onChange={selectAssignment}
                  >Lab</ToggleButton>
                  <ToggleButton
                    type="checkbox"
                    variant="light"
                    value="Code Challenge"
                    onChange={selectAssignment}
                  >Code Challenge</ToggleButton>
                  <ToggleButton
                    type="checkbox"
                    variant="light"
                    value="Other"
                    onChange={selectAssignment}
                  >Other</ToggleButton>
                </ToggleButtonGroup>

                <Form.Control
                  name="assignment_number"
                  as="select"
                  size="md"
                  onChange={handleChange}
                  style={{ display: "inline-block", width: "auto" }}
                  required={classRequired}
                >
                  <option value="">##</option>
                  {assignmentNumbers.map(val => <option key={val}>{val}</option>)}
                </Form.Control>

              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label style={{ display: 'block' }}>Your Remo Location</Form.Label>
                <Form.Control
                  as="select"
                  name="floor"
                  onChange={handleChange}
                  required={true}
                  style={{ display: "inline-block", width: "auto", marginRight: '1rem' }}
                >
                  <option value="">Floor</option>
                  {[1, 2, 3, 4].map(floor =>
                    <option key={`floor-${floor}`} value={floor}>{floor}</option>,
                  )}
                </Form.Control>

                <Form.Control
                  as="select"
                  name="table"
                  onChange={handleChange}
                  required={true}
                  style={{ display: "inline-block", width: "auto", marginRight: '1rem' }}
                >
                  <option value="">Table</option>
                  {tables.map(table =>
                    <option key={`table-${table}`} value={table}>{table}</option>,
                  )}
                </Form.Control>
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
