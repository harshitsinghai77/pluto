import { Row, Col, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import OriginalImage from "../../static/original.png";
import StyledImage from "../../static/style_img.jpg";
import ResultImage from "../../static/result.png";

import "./home.css";

const cardsData = [
  {
    title: "1.Pick a image",
    subtitle:
      "Upload or paste a link to your personal photo or any other image that your want to transfer the style to.",
    img: OriginalImage,
    hyperlinkText: "Showcase",
    hyperlink: "/showcase",
  },
  {
    title: "2. Pick a style ",
    subtitle:
      "Upload a picture that will work as the reference to extract the style from. Our Machine Learning model will transfer the style from this picture to the picture uploaded in the first step.",
    img: StyledImage,
    hyperlinkText: "About",
    hyperlink: "/about",
  },
  {
    title: "3. You're an artist!",
    subtitle:
      " It might take a couple of minutes, because I don't have a #GPU 😥	but... hey, It looks like an actual classical painting once the model is trained.",
    img: ResultImage,
    hyperlinkText: "Try now",
    hyperlink: "/canvas",
  },
];

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <>
      <Hero
        title="You are art. You are an artist"
        subtitle="Use AI to convert your favorite shot into any artistic painting."
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
                  cover={<img alt="example" src={el.img} height="220" />}
                >
                  <Card.Meta
                    title={<h2>{el.title}</h2>}
                    description={<h4>{el.subtitle}</h4>}
                  />
                  <Paragraph align="right">
                    <Link to={el.hyperlink}>{el.hyperlinkText}</Link>
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
