import React from "react";
import { Row, Col, Card, Typography } from "antd";

import Hero from "../../components/Hero";
import barco from "../../static/Imagenbarco.jpg";
import styledBarco from "../../static/result_Imagenbarco.jpg";
import monet from "../../static/monet.jpg";

import "./home.css";

const cardsData = [
  {
    title: "1.Pick a style",
    subtitle:
      "Select among some of the most famous artists around the world. Their style will be transfered.",
    img: monet,
    hyperlink: "Showcase",
  },
  {
    title: "2. Upload your picture",
    subtitle:
      " Our Machine Learning model will transfer the artist style to your picture.",
    img: barco,
    hyperlink: "About",
  },
  {
    title: "3. You're an artist!",
    subtitle:
      " It might take a couple of minutes, because #GPU but... hey, It looks like an actual classical painting.",
    img: styledBarco,
    hyperlink: "Try now",
  },
];

const { Title, Paragraph, Link } = Typography;

function Home() {
  return (
    <>
      <Hero
        title="You are art. You are an artist"
        subtitle="With help of AI convert your favorite shot into a famous artist’s painting."
      />
      <div className="home-container">
        <Title>How it works</Title>

        <Row gutter={16} justify="center" align="center">
          {cardsData.map((el, index) => {
            return (
              <Col span={8} key={index}>
                <Card
                  className="card-box"
                  hoverable
                  // style={{ width: 240, height: 240 }}
                  cover={
                    <img alt="example" src={el.img} width="240" height="200" />
                  }
                >
                  <Card.Meta
                    title={<h2>{el.title}</h2>}
                    description={<h4>{el.subtitle}</h4>}
                  />
                  <Paragraph align="right">
                    <Link>{el.hyperlink}</Link>
                  </Paragraph>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default Home;
