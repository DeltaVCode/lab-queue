import React from 'react';

import Staff from './staff.js';
import Courses from './courses.js';
import Auth from '../auth/auth.js';

const AdminForms = props => {

  const styles = {
    admin: {
      display: "flex",
      flex: 1,
      justifyContent: "space-around"
    }
  }

  return (
    <>
      <section style={styles.admin}>
        <Auth capability="delete">
          <Staff />
        </Auth>
        <Auth capability="delete">
          <Courses />
        </Auth>
      </section>
    </>
  );
};

export default AdminForms;
