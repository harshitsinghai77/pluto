import { Row, Col, Image, Carousel, Result, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import "./resultscreen.css";

function ResultScreen(props) {
  const { loading, response, reset } = props;

  return (
    <Row>
      <Col span={24}>
        {loading ? (
          <>
            <Result title="Your style is being processed...Please wait" />
            <Spin size="large" spinning={loading} />{" "}
          </>
        ) : (
          <>
            <Image width="auto" src={response ? response.result_img : null} />
            <h1>Check your collection</h1>
            <Carousel autoplay dotPosition="top">
              <Image width={500} src={response ? response.result_img : null} />

              <Image
                width={500}
                src={response ? response.original_img : null}
              />

              <Image width={500} src={response ? response.style_img : null} />
            </Carousel>
            <Result
              status="success"
              title="Wasn't this amazing??"
              subTitle="Thanks for checking us out. We are constantly working to improve our model, to make it more better, faster and robust"
              extra={[
                <Button type="primary" key="console" onClick={() => reset()}>
                  I want to do it again !!
                </Button>,
                <Link to="/showcase">
                  <Button key="buy">Showcase</Button>
                </Link>,
              ]}
            />
          </>
        )}
      </Col>
    </Row>
  );
}

export default ResultScreen;
