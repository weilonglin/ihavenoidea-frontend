import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ADD_VOTE } from "../queries/queries";

const CardBox = styled.div`
  width: 395px;
  height: 100%;
  background: #fffdfd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  flex-grow: 2;

  @media (max-width: 1080px) {
    width: 300px;
  }

  @media (max-width: 840px) {
    width: 395px;
  }
`;

const CardBoxTitle = styled.div`
  font-weight: 700;
  padding-bottom: 10px;
`;

const Description = styled.div`
  margin-top: 10px;
`;

const Votes = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

const CardBoxFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
`;

const VisitWebsiteButton = styled.button`
  color: #0a467d;
  text-align: center;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  font-size: 16px;

  a:hover {
    color: white;
  }

  :hover {
    background: #0a467d;
    color: white;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const DetailsButton = styled.button`
  width: 100px;
  border: none;
  padding: 7px;
  background: #c1272d;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  a {
    color: white;
  }

  :hover {
    transform: scale(1.1);
    background: #f74a4e;
  }
`;

type Props = {
  data: CardType;
  addVote: Function;
};

export const Cards = ({ data, addVote }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const [addResourceMutation] = useMutation(ADD_VOTE, {
    onCompleted: () => {
      console.log("succes");
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function vote(id: number) {
    console.log("id", id);
    addResourceMutation({
      variables: {
        userIp: "123.123",
        resourceId: id,
      },
    });
  }

  return (
    <CardBox>
      <CardBoxTitle>{data.name} </CardBoxTitle>
      <Description>
        {open ? data.description : `${data.description.slice(0, 120)} ...`}
      </Description>
      <CardBoxFooter>
        {open ? (
          <>
            <VisitWebsiteButton>
              <a href={data.link} target="_blank" rel="noopener noreferrer">
                Visit website
              </a>
            </VisitWebsiteButton>
            <DetailsButton onClick={() => setOpen(!open)}>Close</DetailsButton>
          </>
        ) : (
          <>
            <Votes onClick={() => vote(data.id)}>
              {`⇧ ${data.vote.length} votes`}
            </Votes>
            <DetailsButton onClick={() => setOpen(true)}>
              More details
            </DetailsButton>
          </>
        )}
      </CardBoxFooter>
    </CardBox>
  );
};
