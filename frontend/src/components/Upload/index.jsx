import { Component } from "react";
import { Upload, Modal, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import URLInput from "../../components/Input";
import "./upload.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

class UploadComponent extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: this.props.fileList || [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    const {
      uploadTitle,
      urlTitle,
      handleChange,
      fileList,
      onTextChange,
      textValue,
      url,
    } = this.props;

    return (
      <>
        <Typography.Title align="left" level={4}>
          {url ? urlTitle : uploadTitle}
        </Typography.Title>

        {url ? (
          <URLInput onChange={onTextChange} value={textValue} />
        ) : (
          <>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </>
        )}
      </>
    );
  }
}

export default UploadComponent;
