import React from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import { Card } from 'antd';
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
    console.log(characters)

    return (
        <Row gutter={[8, 8]} style={{ width: "100%" }}>
            {characters.map((character) => {
                return (
                    <Col key={character.id} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} style={{ padding: '8px' }}>
                        <div style={{ width: "100%" }}>
                            <Card
                                hoverable
                                cover={<Image alt="example" src={character.image} />}
                            >
                                <Meta title={character.name} description={DisplayDescription(character.origin.name, character.location.name)} onClick={() => alert("Hello world")} />
                            </Card>
                        </div>
                    </Col>
                );
            })}
        </Row>
    )
}

export default DisplayCharecter
