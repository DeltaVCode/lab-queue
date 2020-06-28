import React, { useContext } from 'react';
import { If, Then, Else } from 'react-if';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useForm from '../../hooks/form.js';
import { LoginContext } from './context.js';

const Login = (props) => {

  const { handleChange, handleSubmit } = useForm(handleLogin);
  const context = useContext(LoginContext);

  function handleLogin(user) {
    context.login(user.username, user.password);
  }

  return (
    <>
      <If condition={context.loggedIn}>
        <Then>
          <Button variant="danger" onClick={context.logout}>Log Out</Button>
        </Then>
        <Else>
          <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic+identity.email&client_id=3325550325.1203356294198"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
        </Else>
      </If>
    </>
  );
};

export default Login;
