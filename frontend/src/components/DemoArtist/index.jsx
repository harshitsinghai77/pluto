import { Row, Col, Card } from "antd";

const paintaings = [
  "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
  "https://media.architecturaldigest.in/wp-content/uploads/2020/05/oxygen-getty-images.jpg",
  "https://www.digitalartsonline.co.uk/cmsdata/slideshow/3626312/cp21.jpg",
  "https://images.jdmagicbox.com/quickquotes/images_main/hand-painting-304136363-1n46d.jpg",
];

function PickArtist() {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {paintaings.map((el, index) => {
        return (
          <Col className="gutter-row" span={6} key={index}>
            <Card
              hoverable
              style={{ width: 240, height: 240 }}
              cover={<img alt="example" src={el} width="240" height="240" />}
            >
              <Card.Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default PickArtist;
