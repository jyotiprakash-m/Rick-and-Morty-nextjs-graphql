
import Head from "next/head";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import DisplayCharecter from "../components/DisplayCharecter";
import { Divider, Input, Space } from 'antd';
const { Search } = Input;
import { CloseSquareOutlined } from '@ant-design/icons';
export default function Home(results) {
  const intialState = results;
  const [characters, setCharacters] = useState(intialState.characters);
  const [search, setSearch] = useState("")

  const onSearch = async (value) => {
    const client = new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql/",
      cache: new InMemoryCache(),
    });
    const { data } = await client.query({
      query: gql`
        query {
          characters(filter: { name: "${value}" }) {
            info {
              count
            }
            results {
              name
              id
              location {
                name
                id
              }
              image
              origin {
                name
                id
              }
              episode {
                id
                episode
                air_date
              }
            }
          }
        }
      `
    })

    setCharacters(data.characters.results);

  };

  // Details of a charecter



  return (
    <div>
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ padding: "5%" }}>
        <Space direction="horizontal" align="center">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}

          />

        </Space>
        <Divider />

        <DisplayCharecter characters={characters} />
      </div>
    </div>

  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              name
              id
            }
            image
            origin {
              name
              id
            }
            episode {
              id
              episode
              air_date
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}