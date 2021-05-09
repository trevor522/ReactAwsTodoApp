import React, { Component } from "react";
import { Auth, API } from "aws-amplify";
import { message } from "antd";

import AppPresenter from "./AppPresenter";
import { AppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this._addNotification = (content) => {
      const keyArr = Object.keys(this.state.notification);
      let lastInx = parseInt(keyArr[keyArr.length - 1]) + 1;
      if (!lastInx) lastInx = 1;

      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {
            ...currentState.notification,
            [lastInx]: {
              id: lastInx,
              content: content,
              attchment: null,
              seen: false,
              editing: false,
              createdAt: null,
              isTodoLoading: true,
            },
          },
        };
      });
    };

    this._seeNotification = (id) => {
      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {
            ...currentState.notification,
            [id]: {
              ...currentState.notification[id],
              seen: !currentState.notification[id].seen,
              isTodoLoading: true,
            },
          },
        };
      });
    };

    this._editNotification = (id) => {
      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {
            ...currentState.notification,
            [id]: {
              ...currentState.notification[id],
              editing: true,
            },
          },
        };
      });
    };

    this._editDoneNotification = (id, content) => {
      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {
            ...currentState.notification,
            [id]: {
              ...currentState.notification[id],
              content: content,
              editing: false,
              isTodoLoading: true,
            },
          },
        };
      });
    };

    this._deleteNotification = (id) => {
      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {
            ...currentState.notification,
            [id]: {
              ...currentState.notification[id],
              isTodoLoading: true,
            },
          },
        };
        //const newState = delete currentState.notification[id];
        //return newState;
      });
    };

    this._loggedIn = () => {
      this.setState((currentState) => {
        return {
          ...currentState,
          isAuthenticated: true, //사용자 인증 완료
        };
      });
    };

    this._logOut = async () => {
      await Auth.signOut();

      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {},
          isAuthenticated: false, //sider 및 todoList 렌더링 여부
          isAuthenticating: true, //인증 시도 초기화
          isTodoLoaded: false, //todoList 렌더링 여부
        };
      });
      window.location.reload();
    };

    this._loadTodos = async () => {
      try {
        const before = Date.now();
        const todos = await API.get("todos", "/todos");
        console.log(Date.now() - before + "ms초 걸림");
        this.setState((currentState) => {
          return {
            ...currentState,
            notification: todos,
            isTodoLoaded: true,
          };
        });
        //message.success("data is updated!");
      } catch (e) {
        onError(e);
      }
    };

    this.state = {
      notification: {},
      isAuthenticated: false, //로그인 여부
      isAuthenticating: true, //인증 시도 중
      isTodoLoaded: false, //투두 로딩 여부, this._loadTodos끝나면 true
      loggenIn: this._loggedIn,
      logOut: this._logOut,
      loadTodos: this._loadTodos,
      addNotification: this._addNotification,
      deleteNotification: this._deleteNotification,
      seeNotification: this._seeNotification,
      editNotification: this._editNotification,
      editDoneNotification: this._editDoneNotification,
    };
  }

  async onLoad() {
    try {
      await Auth.currentSession();
      this._loggedIn(true); //세션이 있다면 로그인 처리
    } catch (e) {
      onError(e);
    }
    this.setState((currentState) => {
      return {
        ...currentState,
        isAuthenticating: false, //인증 시도 완료, 세션 존재 여부가 상관없음
      };
    });
  }

  componentDidMount() {
    this.onLoad();
    /*
    if (localStorage.list) {
      this.setState((currentState) => {
        return {
          ...currentState,
          notification: JSON.parse(localStorage.list),
        };
      });
    }*/
  }

  componentDidUpdate() {
    //localStorage.list = JSON.stringify(this.state.notification);
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <AppPresenter />
        {/*AppPresenter안에 있는 얘들은 Store에 접근할 수 있음
        Store.Provier에게 value를 주었는데 이제 이걸 consume해서 사용해야 함*/}
      </AppContext.Provider>
    );
  }
}

export default AppContainer;
