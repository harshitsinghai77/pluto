import { useState } from "react";
import { Steps, Button, message, Row, Col, Switch } from "antd";
import UploadComponent from "../../components/Upload";
import DemoArtist from "../../components/DemoArtist";
import ResultScreen from "../../components/ResultScreen";
import axios from "axios";
import "./stepper.css";

const { Step } = Steps;

function isValidUrl(str) {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
}

const Canvas = () => {
  const [current, setCurrent] = useState(0);
  const [contentImage, setContentImage] = useState([]);
  const [styleImage, setStyleImage] = useState([]);

  const [contentImageURL, setContentImageURL] = useState("");
  const [styleImageURL, setStyleImageURL] = useState("");

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [viaURL, setViaURL] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const handleContentChange = ({ fileList }) => {
    setContentImage(fileList);
  };

  const handleStyleChange = ({ fileList }) => {
    setStyleImage(fileList);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Content Image",
      description: "Pick a content image",
    },
    {
      title: "Style Image",
      description: "Pick a style image",
    },
    {
      title: "Results",
      description: "Here is your image",
    },
  ];

  const reset = () => {
    console.log("resetting");
    setCurrent(0);
    setContentImage([]);
    setStyleImage([]);
    setContentImageURL("");
    setStyleImageURL("");
    setResponse(null);
    setLoading(false);
    setViaURL(false);
  };

  const viaImageUpload = () => {
    if (
      contentImage.length > 0 &&
      contentImage[0]["originFileObj"] &&
      styleImage.length > 0 &&
      styleImage[0]["originFileObj"]
    ) {
      let formData = new FormData();
      formData.append("contentImage", contentImage[0].originFileObj);
      formData.append("styleImage", styleImage[0].originFileObj);

      setLoading(true);
      next();
      axios
        .post("http://0.0.0.0:5000/tf-hub/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          const { data } = res;
          setResponse(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      message.error(
        "Could not find content image or style image. Please make sure you uploaded both the images and try again."
      );
    }
  };

  const viaURLUpload = () => {
    if (contentImageURL && styleImageURL) {
      if (isValidUrl(contentImageURL) && isValidUrl(styleImageURL)) {
        const postBody = {
          contentURL: contentImageURL,
          styleURL: styleImageURL,
        };

        setLoading(true);
        next();
        axios
          .post("http://0.0.0.0:5000/tf-hub/url", postBody, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            const { data } = res;
            setResponse(data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        message.error(
          "The link doesn't seem to be a valid url. Please check the link and try again"
        );
      }
    } else {
      message.error("Image url not found. Please check and try again.");
    }
  };

  const onSubmit = () => {
    if (viaURL) {
      viaURLUpload();
    } else if (!viaURL) {
      viaImageUpload();
    }
  };

  const renderSteps = (currentState) => {
    switch (currentState) {
      case 0:
        return (
          <UploadComponent
            uploadTitle="Upload Content Image"
            urlTitle="Enter Content Image URL"
            handleChange={handleContentChange}
            fileList={contentImage}
            onTextChange={(e) => setContentImageURL(e.target.value)}
            textValue={contentImageURL}
            url={viaURL}
          />
        );

      case 1:
        return (
          <UploadComponent
            uploadTitle="Upload Style Image"
            urlTitle="Enter Style Image URL"
            handleChange={handleStyleChange}
            fileList={styleImage}
            onTextChange={(e) => setStyleImageURL(e.target.value)}
            textValue={styleImageURL}
            url={viaURL}
          />
        );

      case 2:
        return (
          <ResultScreen loading={loading} response={response} reset={reset} />
        );

      default:
        return <h1>Default page</h1>;
    }
  };

  return (
    <div className="steps-main">
      <Row justify="center">
        <Col span={12}>
          <Steps progressDot current={current}>
            {steps.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </Steps>

          {current < 2 && (
            <div className="switch-style">
              <Switch
                onChange={(checked) => setViaURL(checked)}
                value={viaURL}
                checkedChildren="via URL"
                unCheckedChildren="via upload"
              />
            </div>
          )}

          <div className="steps-content">{renderSteps(current)}</div>
          <div className="steps-action">
            {current > 0 && current < 2 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}

            {current < steps.length - 1 &&
              current < 2 &&
              (current == 1 ? (
                <Button type="primary" onClick={() => onSubmit()}>
                  Submit
                </Button>
              ) : (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              ))}
            {current === steps.length - 1 && current < 2 && (
              <Button type="primary">Done</Button>
            )}
          </div>
        </Col>
        {current < 2 && (
          <div className="demo-artist">
            <DemoArtist />
          </div>
        )}
      </Row>
    </div>
  );
};

export default Canvas;
