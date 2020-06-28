import React, { useState, useContext } from 'react';

import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';

import { SettingsContext } from '../../context/settings.js';
import { LoginContext } from '../auth/context.js';

const List = (props) => {

  const settings = useContext(SettingsContext);
  const authContext = useContext(LoginContext);

  const list = props.list.filter(item => settings.showCompleted ? true : !item.complete);

  // Removed pagination
  // const start = settings.maxVisible * page || 0;
  // const end = start + settings.maxVisible || list.length;
  // const pages = new Array(Math.ceil(list.length / settings.maxVisible)).fill('');
  // const displayList = list ? list.slice(start, end) : [];
  const displayList = list || [];

  const styles = {
    pill: {
      marginRight: '1rem',
      cursor: 'pointer',
    },
    course: {
      display: 'block',
      fontWeight: 'bold',
      textAlign: 'right',
    },
    location: {
      display: 'block',
      fontStyle: 'italic',
      textAlign: 'right',
    },
    toast: {
      maxWidth: '100%',
      width: '100%',
    },
  };

  function helpWith(id) {
    if (authContext.can('update')) {
      console.log(authContext);
      props.handleComplete(id, authContext.user.name);
    }
  }

  return (

    <>
      {displayList.map(item => (
        <Toast key={item._id} style={styles.toast} onClose={() => props.handleDelete(item._id)}>
          <Toast.Header closeButton={authContext.can('delete') ? true : false}>
            <Badge pill
              style={styles.pill}
              variant={item.complete ? 'danger' : 'success'}
              onClick={() => helpWith(item._id)}
            >
              {item.complete ? `In Progress w/ ${item.assignedTo}` : 'Pending...'}
            </Badge>
            <strong className="mr-auto">{item.student}</strong>
          </Toast.Header>
          <Toast.Body >
            {item.description}
            <small style={styles.course}>
              {item.course}
            </small>
            <small style={styles.course}>
              {item.assignment_type} {item.assignment_number}
            </small>
            <small style={styles.location}>Remo Location: {item.location}</small>
          </Toast.Body>
        </Toast>
      ))
      }

    </>

  );
};

export default List;
