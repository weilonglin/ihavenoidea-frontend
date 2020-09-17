import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const TopicsDiv = styled.div`
  background: #f3f3f3;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 10px;
`;

const TopicsTitle = styled.div`
  color: #c1272d;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
`;

const TopicElement = styled.div`
  margin: 3px;
`;

type TopicsType = {
  name: string;
};

type Props = {
  topics: TopicsType[];
};

export const Topics = ({ topics }: Props) => {
  return (
    <TopicsDiv>
      <NavLink to="./">
        <TopicsTitle>Topics</TopicsTitle>
      </NavLink>
      <div>
        {topics.map((topic: TopicsType, i: number) => {
          return (
            <TopicElement key={`topic-${i}`}>
              <NavLink to={`./${topic.name}`} activeClassName="activeTopic">
                {topic.name}
              </NavLink>
            </TopicElement>
          );
        })}
      </div>
    </TopicsDiv>
  );
};
