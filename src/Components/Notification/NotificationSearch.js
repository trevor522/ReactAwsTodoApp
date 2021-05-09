import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flex from "styled-flex-component";

const Notification = styled.div`
  background-color: white;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 1281px) {
    width: 100%;
  }
  padding: 5px;
  border-radius: 15px;
  /*margin: 0px 15px 15px 15px;*/
  box-sizing: border-box;
  border: 2px solid ${(props) => {
    if (props.seen) {
      return "transparent;";
    } else {
      if (props.searching) return "#000000;";
      else return "#000000;";
    }
  }}}
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1rem;
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
  flex: 1;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
  @media (min-width: 1281px) {
    width: 120%;
  }
  color: #808080;
  font-size: 1rem;
  outline: none;
  border: none;
  border-bottom: 0px solid;
`;

const NotificationSearch = ({ setSearch }) => {
  return (
    <Notification seen={false} searching={true}>
      <Flex alignCenter justifyBetween>
        <Title seen={false}>
          <Input
            id="NotificationSearch"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색"
          />
        </Title>
      </Flex>
    </Notification>
  );
};

NotificationSearch.propTypes = {
  search: PropTypes.string,
};

export default NotificationSearch;
