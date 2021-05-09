export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ap-northeast-2",
    BUCKET: "serverless-todo-20200615-attachmentsbucket-oy2pwzpswnek",
  },
  apiGateway: {
    REGION: "ap-northeast-2",
    URL: "https://pwmrbe8s6l.execute-api.ap-northeast-2.amazonaws.com/20200615",
  },
  cognito: {
    REGION: "ap-northeast-2",
    USER_POOL_ID: "ap-northeast-2_IViWTO4Cd",
    APP_CLIENT_ID: "6gm0ds30unf1clh6o717rp17sf",
    IDENTITY_POOL_ID: "ap-northeast-2:c1b206c3-ec4a-4b26-8876-fc8eb8d05f35",
  },
};
