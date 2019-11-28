import { gql } from "apollo-server-micro";
import { NextPage } from "next";
import React from "react";
import { useQuery } from "urql";

const GET_FEED = gql`
  query {
    feed {
      id
      title
    }
  }
`;

const Home: NextPage = () => {
  const [{ data, fetching, error }] = useQuery({ query: GET_FEED });

  if (error) {
    console.log(error);

    return <h1>error</h1>;
  } else if (!data) return <h1>Loading</h1>;

  return (
    <>
      <h1>Hello World</h1>
      {data.feed.map(post => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
    </>
  );
};

export default Home;
