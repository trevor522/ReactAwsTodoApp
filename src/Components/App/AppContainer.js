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
          isAuthenticated: true, //????????? ?????? ??????
        };
      });
    };

    this._logOut = async () => {
      await Auth.signOut();

      this.setState((currentState) => {
        return {
          ...currentState,
          notification: {},
          isAuthenticated: false, //sider ??? todoList ????????? ??????
          isAuthenticating: true, //?????? ?????? ?????????
          isTodoLoaded: false, //todoList ????????? ??????
        };
      });
      window.location.reload();
    };

    this._loadTodos = async () => {
      try {
        const before = Date.now();
        const todos = await API.get("todos", "/todos");
        console.log(Date.now() - before + "ms??? ??????");
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
      isAuthenticated: false, //????????? ??????
      isAuthenticating: true, //?????? ?????? ???
      isTodoLoaded: false, //?????? ?????? ??????, this._loadTodos????????? true
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
      this._loggedIn(true); //????????? ????????? ????????? ??????
    } catch (e) {
      onError(e);
    }
    this.setState((currentState) => {
      return {
        ...currentState,
        isAuthenticating: false, //?????? ?????? ??????, ?????? ?????? ????????? ????????????
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
        {/*AppPresenter?????? ?????? ????????? Store??? ????????? ??? ??????
        Store.Provier?????? value??? ???????????? ?????? ?????? consume?????? ???????????? ???*/}
      </AppContext.Provider>
    );
  }
}

export default AppContainer;
