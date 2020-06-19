import React, { useState, useContext } from 'react';

import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';
import Pagination from 'react-bootstrap/Pagination';

import { SettingsContext } from '../../context/settings.js';
import { LoginContext } from '../auth/context.js';

const List = (props) => {

  const settings = useContext(SettingsContext);
  const authContext = useContext(LoginContext);

  const [page, setPage] = useState(0);

  // Paginate the list
  const list = props.list.filter(item => settings.showCompleted ? true : !item.complete);
  const start = settings.maxVisible * page || 0;
  const end = start + settings.maxVisible || list.length;
  const pages = new Array(Math.ceil(list.length / settings.maxVisible)).fill('');

  const displayList = list ? list.slice(start, end) : [];

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

  console.log(authContext.can('delete'));
  return (

    <>
      {displayList.map(item => (
        <Toast key={item._id} style={styles.toast} onClose={() => props.handleDelete(item._id)}>
          <Toast.Header closeButton={authContext.can('delete') ? true : false}>
            <Badge pill
              style={styles.pill}
              variant={item.complete ? 'danger' : 'success'}
              onClick={() => authContext.can('update') && props.handleComplete(item._id)}
            >
              {item.complete ? 'In Progress' : 'Pending...'}
            </Badge>
            <strong className="mr-auto">{item.student}</strong>
          </Toast.Header>
          <Toast.Body >
            {item.issue}
            <small style={styles.course}>Course: {item.course}, {item.assignment}</small>
            <small style={styles.location}>Remo Location: {item.location}</small>
          </Toast.Body>
        </Toast>
      ))}

      <Pagination>
        {
          pages.map((n, i) =>
            <Pagination.Item key={i + 1} onClick={() => setPage(i)}>
              {i + 1}
            </Pagination.Item>,
          )
        }
      </Pagination>

    </>

  );
};

export default List;
