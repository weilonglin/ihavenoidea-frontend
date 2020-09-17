import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RESOURCE, ALL_CATEGORY } from "../queries/queries";

const ResourceForm = styled.div`
  width: 450px;
  background: #f3f3f3;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  input,
  textarea,
  select {
    padding: 5px;
    margin: 10px 0px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
  }
`;

const FormTitle = styled.div`
  text-align: center;
  color: #c1272d;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
`;

const ResourceButton = styled.button`
  border: none;
  padding: 10px;
  background: #c1272d;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const Tagsdiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap,
  border: 1px solid black;
`;

const Tags = styled.div`
  border: 1px solid #dfdfdf;
  padding: 10px;
  margin: 0 10px 10px 0;
  color: black;
  border-radius: 5px;
  cursor: pointer;
`;

type Props = {
  addResToggle: Function;
};

type CategoryType = {
  name: string;
};

//TODO: Validations
export const AddResource = ({ addResToggle }: Props) => {
  const [variables, setVariables] = useState({
    topicName: "",
    websiteUrl: "",
    category: "",
    description: "",
    tags: "",
  });
  const [tags, setTags] = useState<string[]>([]);

  const [addResourceMutation] = useMutation(ADD_RESOURCE, {
    onCompleted: () => {
      addResToggle(false);
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  const { data } = useQuery(ALL_CATEGORY);

  function handleSubmit() {
    console.log({
      name: variables.topicName,
      link: variables.websiteUrl,
      description: variables.description,
      category: variables.category,
      resourcetag: tags,
    });
    addResourceMutation({
      variables: {
        name: variables.topicName,
        link: variables.websiteUrl,
        description: variables.description,
        category: variables.category,
        resourcetag: tags,
      },
    });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.toLowerCase();
    if (input[input.length - 1] === ",") {
      const tag = input.slice(0, -1);
      setTags([...tags, tag]);
      setVariables({ ...variables, tags: "" });
    } else {
      setVariables({ ...variables, tags: input });
    }
  }
  return (
    <ResourceForm>
      <FormTitle>Add a resource</FormTitle>
      <label>Topic name:</label>
      <input
        type="text"
        value={variables.topicName}
        onChange={(e) =>
          setVariables({ ...variables, topicName: e.target.value })
        }
      />
      <label>Website URL:</label>
      <input
        type="text"
        value={variables.websiteUrl}
        onChange={(e) =>
          setVariables({ ...variables, websiteUrl: e.target.value })
        }
      />
      <label>Choose category</label>

      <select
        onChange={(e) =>
          setVariables({ ...variables, category: e.target.value })
        }
      >
        {data ? (
          data.allCategories.map((cat: CategoryType, index: Number) => {
            return (
              <option key={`name-${index}`} value={cat.name}>
                {cat.name}
              </option>
            );
          })
        ) : (
          <option value="loading">...Loading</option>
        )}
      </select>
      <label>Add topic tags</label>
      <input
        type="text"
        value={variables.tags}
        onChange={(e) => handleInput(e)}
      />
      <Tagsdiv>
        {tags.map((tag: string, index: number) => {
          return <Tags key={`tag-${index}`}>{tag}</Tags>;
        })}
      </Tagsdiv>

      <label>Description:</label>
      <textarea
        value={variables.description}
        onChange={(e) =>
          setVariables({ ...variables, description: e.target.value })
        }
      />
      <ResourceButton onClick={() => handleSubmit()}>
        Add resource
      </ResourceButton>
    </ResourceForm>
  );
};
