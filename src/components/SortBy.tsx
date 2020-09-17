import React from "react";
import styled from "styled-components";

const SelectElement = styled.select`
  background: #efefef;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  width: 20%;
`;

type Props = {
  setSorting: Function;
};

export const SortBy = ({ setSorting }: Props) => {
  return (
    <SelectElement
      onChange={(e) => setSorting(e.target.value)}
      defaultValue={"popular"}
    >
      <option value={"popular"}>Popular</option>
      <option value={"recent"}>Recent</option>
      <option value={"random"}>Random</option>
    </SelectElement>
  );
};
