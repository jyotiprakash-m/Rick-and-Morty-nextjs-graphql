import React, { useState } from 'react'
import { Row, Col, Image, Card, Modal } from 'antd';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import moment from 'moment';
const { Meta } = Card;
const DisplayDescription = (origin, live) => {
    return (
        <div className="description">
            <p><strong>Origin: </strong>{origin}</p>
            <p><strong>Location: </strong>{live}</p>
        </div>
    )
}

function DisplayCharecter({ characters }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [character, setCharacter] = useState([]);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const charecterDetails = async (value) => {
        const client = new ApolloClient({
            uri: "https://rickandmortyapi.com/graphql/",
            cache: new InMemoryCache(),
        });
        const { data } = await client.query({
            query: gql`
            query{
                character(id:${value}){
                  id
                  name
                  status
                  species
                  type
                  gender
                  origin{
                    id
                    name
                  }
                  location{
                    id
                    name
                     
                  }
                  image
                  created
                  episode{
                    name
                    air_date
                  }
                }
              }
            `
        })
        setCharacter(data.character);
        showModal();
    }
    // console.log(character.origin?.name)
    return (
        <Row gutter={[8, 8]} className="displayCharecterRow">
            {/* Diisplay all charescters in the list */}
            {characters.map((character) => {
                return (
                    <Col key={character.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} className="displayCharecterCol">
                        <div style={{ width: "100%" }}>
                            <Card
                                hoverable
                                cover={<Image alt="example" src={character.image} />}
                            >
                                <Meta title={character.name} description={DisplayDescription(character.origin.name, character.location.name)} onClick={() => {
                                    charecterDetails(character.id);
                                }} />
                            </Card>
                        </div>
                    </Col>
                );
            })}
            {/* Display the details in the modal */}
            <Modal style={{ top: 20 }}
                title="Charecter Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="imageBox">

                    <img
                        src={character.image}
                    />
                </div>
                <div>
                    <h2><strong>Name: </strong>{character.name}</h2>
                    <h3><strong>ID: </strong>{character.id}</h3>
                    <h3><strong>Created At: </strong>{moment(character.created).add(10, 'days').calendar()}</h3>
                    <h3><strong>Status: </strong>{character.status}</h3>
                    <h3><strong>Gender: </strong>{character.gender}</h3>
                    <h3><strong>Origin: </strong>{character.origin?.name}</h3>
                    <h3><strong>Location: </strong>{character.location?.name}</h3>
                    <h3><strong>Apperance: </strong>
                        {character.episode?.map((item, index) => {
                            return (

                                <span key={index} className="appeance" title={item?.air_date}>{item?.name} , </span>
                            )
                        })}
                    </h3>

                </div>
            </Modal>
        </Row>
    )
}

export default DisplayCharecter
