import { message } from "antd";

export function onError(error) {
  if (!(error instanceof Error) && error.message) {
    console.log(error);
    switch (error.code) {
      case "UserNotFoundException":
        return message.error("존재하지 않는 이메일입니다.", 1);
      case "NotAuthorizedException":
        if (error.message === "User is disabled.")
          return message.error("비활성화된 계정입니다.", 1);
        return message.error("이메일 또는 비밀번호가 틀립니다.", 1);
      case "InvalidParameterException":
        return message.error("비밀번호는 6자 이상이여야 합니다.", 1);
      case "UsernameExistsException":
        return message.error("이미 존재하는 이메일입니다.", 1);
      case "InvalidPasswordException":
        return message.error("비밀번호에 특수문자가 포함되어야 합니다.", 1);
      case "CodeMismatchException":
        return message.error("인증 코드가 틀립니다.", 1);
      case "UserNotConfirmedException":
        return message.error("이메일 인증을 완료해주세요.", 1);
      default:
        return message.error("알 수 없는 오류가 발생했습니다.", 1);
    }
  }
}
