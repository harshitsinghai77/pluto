import { Row, Col, Card } from "antd";

const paintaings = [
  "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
  "https://media.architecturaldigest.in/wp-content/uploads/2020/05/oxygen-getty-images.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2EDr6DB2EJL4sOm6oNf_mqvwnhb7PiKJmyA&usqp=CAU",
  "https://i.pinimg.com/originals/db/00/ab/db00abcf6c5909bf4763f8c30fbe1701.jpg",
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
              <Card.Meta description="Use Pluto to create your own Artistic shot" />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default PickArtist;
