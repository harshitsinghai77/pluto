import { Input } from "antd";

function URLInput(props) {
  const { onChange, value } = props;
  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        addonBefore="website"
        placeholder="Enter url"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default URLInput;
