import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";

import { useAppContext } from "../../libs/contextLib";

const Header = styled.header`
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
  height: 100px;
  width: 50%;
  background-color: #ecf0f1;
  padding: 0 40px;
  @media (min-width: 1281px) {
    margin: 30px 25% 30px 25%;
  }
`;

const HeaderIcon = styled.span`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  color: white;
  background-color: #3498db;
  margin-right: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  position: relative;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Number = styled.span`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #8e44ad;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 25px;
  top: -10px;
`;

const getUnSeen = (notification) => {
  let unSeen = [];
  Object.keys(notification).map((key) => {
    if (!notification[key].seen) return unSeen.push(notification[key]);
    else return null;
  });
  return unSeen.length;
};

const HeaderPresenter = () => {
  const { isAuthenticated, logOut, notification } = useAppContext();

  return (
    <Header>
      {isAuthenticated ? (
        <Flex full justifyBetween alignCenter>
          <FlexItem>
            <Flex>
              {/*<HeaderIcon>
                <FontAwesome name="bell" />
                <Number>{getUnSeen(notification)}</Number>
              </HeaderIcon>*/}

              <Button onClick={logOut}>
                <PoweroffOutlined />
                로그아웃
              </Button>
            </Flex>
          </FlexItem>
        </Flex>
      ) : (
        <></>
      )}
    </Header>
  );
};

export default HeaderPresenter;
