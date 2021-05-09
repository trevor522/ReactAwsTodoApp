import React, { Fragment, useState, useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Header from "Components/Header";
import Sider from "Components/Sider";
import Notification from "Components/Notification";
import NotificationAdd from "Components/Notification/NotificationAdd";
import Login from "Components/Login";
import { useAppContext } from "../../libs/contextLib";

const AppPresenter = () => {
  const {
    isAuthenticated,
    isAuthenticating,
    isTodoLoaded,
    notification,
    loadTodos,
  } = useAppContext();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isAuthenticated) loadTodos(); //조건문을 넣지 않으면 사용자 인증이 되지 않은 상태로 db를 요청해서 403이 리턴되는 낭비가 발생
  }, [isAuthenticated, loadTodos]); //사용자 인증 완료 여부가 바뀔 때 마다(로그인/로그아웃시 마다 바뀌는 값:isAuthenticated)

  const TodoList = () => {
    const arr = Object.keys(notification).sort(function (a, b) {
      return b - a;
    });

    if (search) {
      if (search === "!done") {
        return [
          <h1 key="search">'{search}'에 대한 검색결과</h1>,
          arr.map((key) => {
            if (notification[key].seen === true) {
              return (
                <Notification
                  key={key}
                  id={key}
                  todoId={notification[key].todoId}
                  content={notification[key].content}
                  attachment={notification[key].attachment}
                  seen={notification[key].seen}
                  editing={notification[key].editing}
                  isTodoLoading={notification[key].isTodoLoading}
                />
              );
            } else return null;
          }),
        ];
      } else if (search === "!do") {
        return [
          <h1 key="search">'{search}'에 대한 검색결과</h1>,
          arr.map((key) => {
            if (notification[key].seen === false) {
              return (
                <Notification
                  key={key}
                  id={key}
                  todoId={notification[key].todoId}
                  content={notification[key].content}
                  attachment={notification[key].attachment}
                  seen={notification[key].seen}
                  editing={notification[key].editing}
                  isTodoLoading={notification[key].isTodoLoading}
                />
              );
            } else return null;
          }),
        ];
      } else
        return [
          <Fragment key="search-help">
            <h1>'{search}'에 대한 검색결과</h1>
            <h4
              style={{ textWeight: "700", marginTop: -15, paddingBottom: 10 }}
            >
              <search-help>!do</search-help> 또는
              <search-help> !done</search-help> 으로 검색할 수 있습니다.
            </h4>
          </Fragment>,
          arr.map((key) => {
            if (notification[key].content.indexOf(search) !== -1) {
              return (
                <Notification
                  key={key}
                  id={key}
                  todoId={notification[key].todoId}
                  content={notification[key].content}
                  attachment={notification[key].attachment}
                  seen={notification[key].seen}
                  editing={notification[key].editing}
                  isTodoLoading={notification[key].isTodoLoading}
                />
              );
            } else return null;
          }),
        ];
    } else {
      return [
        <NotificationAdd key="notificationAdd" />,
        arr.map((key) => (
          <Notification
            key={key}
            id={key}
            todoId={notification[key].todoId}
            content={notification[key].content}
            attachment={notification[key].attachment}
            seen={notification[key].seen}
            editing={notification[key].editing}
            isTodoLoading={notification[key].isTodoLoading}
          />
        )),
      ];
    }
  };

  return (
    !isAuthenticating && (
      <>
        <Header />
        <main>
          {isAuthenticated ? (
            <>
              <div style={{ width: "14%" }}>
                <Sider setSearch={setSearch} />
              </div>
              <div
                style={{
                  width: "36%",
                }}
              >
                {isTodoLoaded ? (
                  <TodoList />
                ) : (
                  <Spin
                    style={{
                      marginTop: "15px",
                      width: "100%",
                    }}
                    indicator={
                      <LoadingOutlined style={{ fontSize: 40 }} spin />
                    }
                  />
                )}
              </div>
            </>
          ) : (
            <Login />
          )}
        </main>
      </>
    )
  );
};

export default AppPresenter;
