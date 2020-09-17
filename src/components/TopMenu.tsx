import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

const Menudiv = styled.div`
  width: 1080px;
  padding: 10px 0 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuTitle = styled.div`
  font-weight: 700;
`;

const MenuButton = styled.button`
  border: none;
  padding: 10px;
  background: #c1272d;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background: #f74a4e;
    color: white;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

type Props = {
  addResToggle: Function;
};

export const TopMenu = ({ addResToggle }: Props) => {
  return (
    <Container>
      <Menudiv>
        <MenuTitle>
          <a href="/">Resourcey McResoursyson</a>
        </MenuTitle>
        <MenuButton onClick={() => addResToggle(true)}>Add resource</MenuButton>
      </Menudiv>
    </Container>
  );
};
