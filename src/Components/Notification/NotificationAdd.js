import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import { API } from "aws-amplify";

import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";

const Notification = styled.div`
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
  border: 2px solid ${(props) => {
    if (props.seen) {
      return "transparent;";
    } else {
      if (props.editing) return "#5bc0de;";
      else return "#e74c3c;";
    }
  }}}//(props.seen ? "transparent" : "#e74c3c")};
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 200%;
  }
  @media (min-width: 1281px) {
    width: 80%;
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

const NotificationAdd = () => {
  const { loadTodos, addNotification } = useAppContext();
  const [content, setContent] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const seen = false;

  async function handleSubmit() {
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

    addNotification(content);
    try {
      //const attachment = file.current ? await s3Upload(file.current) : null;
      await createNote({ content, attachment, seen });
      loadTodos();
    } catch (e) {
      onError(e);
    }
  }

  function createNote(note) {
    return API.post("todos", "/todos", {
      body: note,
    });
  }

  function onClick(callback) {
    callback();
    document.getElementById("NotificationAdd").value = "";
    setContent("");
  }

  return (
    <Notification seen={false} editing={true}>
      <Flex alignCenter justifyBetween>
        <Title seen={false}>
          <Input
            id="NotificationAdd"
            type="text"
            onChange={(e) => setContent(e.target.value)}
            placeholder={"할 일을 적어주세요."}
            onKeyPress={(e) => {
              if (e.key === "Enter" && content) {
                onClick(() => handleSubmit());
              }
            }}
          />
        </Title>
        <FlexItem>
          <Fragment>
            <Fragment>
              <Button
                edit
                onClick={() => {
                  if (content) onClick(() => handleSubmit());
                }}
              >
                <FontAwesome name="plus" />
              </Button>
            </Fragment>
          </Fragment>
        </FlexItem>
      </Flex>
    </Notification>
  );
};

export default NotificationAdd;
