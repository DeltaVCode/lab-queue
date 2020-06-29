import React, { useContext } from 'react';
import { If, Then, Else } from 'react-if';

import Button from 'react-bootstrap/Button';

import { LoginContext } from './context.js';

const Login = (props) => {

  const context = useContext(LoginContext);

  return (
    <>
      <If condition={context.loggedIn}>
        <Then>
          <Button variant="danger" onClick={context.logout} size="sm">Log Out</Button>
        </Then>
        <Else>
          <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic+identity.email&client_id=3325550325.1203356294198"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
        </Else>
      </If>
    </>
  );
};

export default Login;
