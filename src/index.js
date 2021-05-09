import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Amplify from "aws-amplify";

import "./typography";
import "./index.css";
import config from "./config";

createGlobalStyle`
${reset};
body{
    background-color:#ecf0f1;
}`;

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "todos",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(<App />, document.getElementById("root"));
