import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { useQuery, gql } from "@apollo/client";

const GET_CONTENT = gql`
  query GetContent {
    contentCards(filter: { limit: 20, keywords: "", types: [PODCAST] }) {
      edges {
        ... on Podcast {
          name
          image {
            ...Image
          }
          categories {
            ...Category
          }
          experts {
            ...Expert
          }
        }
      }
    }
  }
  fragment Image on Image {
    uri
  }
  fragment Category on Category {
    name
  }
  fragment Expert on Expert {
    firstName
    lastName
    title
    company
  }
`;
function App() {
  const [term, setTerm] = useState("");
  const { loading, error, data } = useQuery(GET_CONTENT);
  const [allData, setAllData] = useState(null);
  useEffect(() => {
    setAllData(data && data.contentCards && data.contentCards?.edges);    
  }, [data]);
  return (
    <div className="max-w-100 p-5 min-h-screen bg-dark">
      <section className="group my-4 max-w-100 md:max-w-lg">
        <p className="text-white font-semibold text-xl mb-2">Search</p>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="bg-primary shadow appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Type any keyword"
        />
      </section>
      <section className="max-w-100 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading ? <h1>Loading.........</h1> : ""}
        {error ? <h1>{JSON.stringify(error)}</h1> : ""}
        {allData ? allData.map((item) => <Card item={item} />) : ""}
      </section>
    </div>
  );
}

export default App;
