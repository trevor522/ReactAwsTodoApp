import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Flex from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import { API } from "aws-amplify";

import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";

const Notification = styled.div`
  opacity: ${(props) => {
    if (props.isTodoLoading) {
      return 0.5;
    } else return 1;
  }};
  background-color: white;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 1281px) {
    width: 100%;
  }
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 2px
    ${(props) => {
      if (props.seen) {
        return "solid #ffffff;";
      } else {
        if (props.editing) return "dashed #e74c3c;";
        else return "solid #e74c3c;";
      }
    }};
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 200%;
  }
  @media (min-width: 1281px) {
    width: 65%;
  }
  ${(props) => {
    if (props.seen) {
      return "text-decoration: line-through";
    }
  }};
`;

const Input = styled.input`
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 1281px) {
    width: 100%;
  }
  color: #808080;
  font-size: 1.25rem;
  outline: none;
  border: none;
  border-bottom: 0px solid;
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  margin-left: 5px;
  border-radius: 50%;
  border: 0;
  color: white;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.seen) {
      return "#7f8c8d";
    } else if (props.success) {
      return "#2ecc71";
    } else if (props.danger) {
      return "#e74c3c";
    } else if (props.edit) {
      return "#5bc0de";
    }
  }};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(1px);
  }
`;

const NotificationPresenter = ({
  id,
  todoId,
  content,
  seen,
  attachment,
  editing,
  isTodoLoading,
}) => {
  const { loadTodos } = useAppContext();
  const {
    editNotification,
    editDoneNotification,
    seeNotification,
    deleteNotification,
  } = useAppContext();
  const [edit, setEdit] = useState(content);

  async function handleSubmit(editSeen) {
    /*
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
    */
    try {
      //const attachment = file.current ? await s3Upload(file.current) : null;
      editDoneNotification(id, edit);
      await updateTodo({ edit, attachment, editSeen });
      loadTodos();
    } catch (e) {
      onError(e);
    }
  }

  function updateTodo(note) {
    return API.put("todos", "/todos/" + todoId, {
      body: note,
    });
  }

  async function handleDelete() {
    try {
      deleteNotification(id);
      await deleteTodo();
      loadTodos();
    } catch (e) {
      onError(e);
    }
  }

  function deleteTodo() {
    return API.del("todos", "/todos/" + todoId);
  }

  return (
    <Notification isTodoLoading={isTodoLoading} seen={seen} editing={editing}>
      <Flex alignCenter justifyBetween>
        <Title seen={seen}>
          {!editing ? (
            content
          ) : (
            <Input
              autoFocus
              type="text"
              onChange={(e) => setEdit(e.target.value)}
              placeholder={!content ? "할 일을 적어주세요." : ""}
              defaultValue={content ? content : ""}
              onKeyPress={(e) => {
                if (e.key === "Enter" && edit) handleSubmit(seen); //현재 seen여부를 보내줘야 db에서 갱신할 수 있음
              }}
            />
          )}
        </Title>
        {isTodoLoading ? (
          <Spin
            style={{
              position: "relative",
              right: "20%",
            }}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          />
        ) : (
          <Spin
            style={{
              opacity: 0,
              position: "relative",
              right: "20%",
            }}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          />
        )}
        <Fragment>
          {editing ? (
            <Fragment>
              <Button
                edit
                seen={isTodoLoading | seen}
                onClick={() => {
                  if (edit) handleSubmit(seen);
                }}
              >
                <FontAwesome name="check" />
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                edit
                seen={isTodoLoading | seen}
                onClick={() => {
                  if (!isTodoLoading) editNotification(id);
                }}
              >
                <FontAwesome name="edit" />
              </Button>
              <Button
                success
                seen={isTodoLoading | seen}
                onClick={() => {
                  if (!isTodoLoading) {
                    handleSubmit(!seen);
                    seeNotification(id);
                  }
                }}
              >
                <FontAwesome name="check" />
              </Button>
              <Button
                danger
                seen={isTodoLoading | seen}
                onClick={() => {
                  if (!isTodoLoading) handleDelete(id);
                }}
              >
                <FontAwesome name="times" />
              </Button>
            </Fragment>
          )}
        </Fragment>
      </Flex>
    </Notification>
  );
};
export default NotificationPresenter;
