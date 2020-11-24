import { Card, Row, Col, Typography, Button, Space } from "antd";
import { Link } from "react-router-dom";
import "./hero.css";

const MONET_IMG =
  "https://www.latercera.com/resizer/kHLHjR6u3jIRC7-xl_1oXBzxWUE=/800x0/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/MEP3EKODIVGKPDXNMGNLB6ZN3A.jpg";

function Hero(props) {
  const { title, subtitle } = props;
  return (
    <Row style={{ height: "60vh" }}>
      <Col span={24}>
        <Card
          className="mainFeaturedPost"
          style={{
            backgroundImage: `url(${MONET_IMG}`,
            height: "100%",
          }}
        >
          {/* Increase the priority of the hero background image */}
          {<img style={{ display: "none" }} src={MONET_IMG} alt={"Monet"} />}
          <div className="overlay" />
          <div className="mainFeaturedPostContent">
            <Typography.Title>{title}</Typography.Title>
            <Typography.Title level={3}>{subtitle}</Typography.Title>

            <Space>
              <Link to="/canvas">
                <Button type="danger" className="link">
                  Get Started
                </Button>
              </Link>

              <a
                href="https://github.com/harshitsinghai77/jetBrains-PyChamps-hackathon"
                target="_blank"
              >
                <Button type="primary" className="link">
                  GitHub
                </Button>
              </a>
            </Space>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Hero;
