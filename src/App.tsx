import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./App.css";

import { AddResource } from "./components/AddResource";
import { Cards } from "./components/Cards";
import { Searchbar } from "./components/Searchbar";
import { SortBy } from "./components/SortBy";
import { Topics } from "./components/Topics";
import { TopMenu } from "./components/TopMenu";
import { useQuery, useMutation } from "@apollo/client";

import { ALL_RESOURCES, ALL_CATEGORY, ADD_VOTE } from "./queries/queries";
import { Loading } from "./components/Loading";

function App() {
  const { data: catData } = useQuery(ALL_CATEGORY);
  const { data } = useQuery(ALL_RESOURCES);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [addRes, setAddRes] = useState<boolean>(false);

  const [allData, setAllData] = useState<CardType[]>();

  const [addResourceMutation] = useMutation(ADD_VOTE, {
    onCompleted: () => {
      console.log("succes");
    },
    onError: (error: any) => console.log("error", error?.networkError?.result),
    errorPolicy: "all",
  });

  function handleResult(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchResults(value);
  }

  function addVote(id: number) {
    addResourceMutation({
      variables: {
        userIp: "123.123",
        resourceId: id,
      },
    });
  }

  useEffect(() => {
    const catName = location.pathname.slice(1);
    if (data !== undefined) {
      let newData = [...data.allResource];
      let sortedData = newData
        .filter((resource: CardType) =>
          catName.length > 2 ? resource.category.name === catName : true
        )
        .filter((resource: CardType) =>
          searchResults.length < 3
            ? true
            : resource.name.includes(searchResults) ||
              resource.description.includes(searchResults)
        )
        .sort((r1: CardType, r2: CardType) => {
          if (sortBy === "random") {
            return Math.random() - Math.random();
          } else if (sortBy === "recent") {
            return r2.id - r1.id;
          } else {
            return r2.vote.length - r1.vote.length;
          }
        });
      setAllData(sortedData);
    }
  }, [data, sortBy, location, searchResults]);

  if (data && allData) {
    return (
      <>
        <TopMenu addResToggle={setAddRes} />
        <div id="main">
          <div id="dashboard">
            <div id="topics-div">
              {catData ? (
                <Topics topics={catData.allCategories} />
              ) : (
                <Loading />
              )}
            </div>
            <div id="main-div">
              <div id="search-sortbar">
                <Searchbar
                  searchResults={searchResults}
                  handleResult={handleResult}
                />
                <SortBy setSorting={setSortBy} />
              </div>
              <div id="results">
                {window.innerWidth > 840 ? (
                  <>
                    <div id="leftside">
                      {allData.map((card: CardType, index: number) => {
                        if (index % 2 === 0)
                          return (
                            <Cards
                              key={`card-${index}`}
                              data={card}
                              addVote={addVote}
                            />
                          );
                        return <i key={`invisible-${index}`} />;
                      })}
                    </div>
                    <div id="rightside">
                      {allData.map((card: CardType, index: number) => {
                        if (index % 2 !== 0)
                          return (
                            <Cards
                              key={`card-${index}`}
                              data={card}
                              addVote={addVote}
                            />
                          );
                        return <i key={`invisible-${index}`} />;
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {allData.map((card: CardType, index: number) => (
                      <Cards
                        key={`card-${index}`}
                        data={card}
                        addVote={addVote}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <AnimatePresence>
            {addRes && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  exit={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="addres-modal"
                >
                  <AddResource addResToggle={setAddRes} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="overlay"
                  onClick={() => setAddRes(false)}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }
  return <Loading />;
}
export default App;
