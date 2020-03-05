import React, { useState, useEffect } from "react";
import Search from "react-search";
import * as HELPER from "../util/use";

export default function SearchEngine({ groups, setGroups }) {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    async function fetch() {
      setTemp(groups);
    }
    fetch();
  }, []);

  const search = e => {
    if (e.target.value === "") {
      setGroups(temp);
    } else {
      groups
        .filter(group => {
          return group.Title.includes(e.target.value);
          setGroups(HELPER.arrayRemove(groups, group));
        })
        .forEach(element => {
          if (!element.Title.includes(e.target.value)) {
            setGroups(HELPER.arrayRemove(groups, element));
          } else {
          }
        });
    }
  };
  return (
    <div>
      <input type="text" onChange={e => search(e)} placeholder="Search" />
    </div>
  );
}
