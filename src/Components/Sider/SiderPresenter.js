import React from "react";
import styled from "styled-components";

import NotificationSearch from "../Notification/NotificationSearch";

const Sider = styled.div`
  background-color: #ffffff;
  margin-right: 30px;
`;

const SiderPresenter = ({ setSearch }) => {
  return (
    <Sider>
      <NotificationSearch setSearch={setSearch} />
    </Sider>
  );
};

export default SiderPresenter;
