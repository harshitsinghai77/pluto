import { Image } from "antd";
import "./image-gallary.css";

function CarouselShowcase(props) {
  const { imgGallary } = props;
  return (
    <div className="img_gallary_container">
      <div className="img_gallary_photos">
        {imgGallary.map((el, index) => (
          <Image src={el} key={index} alt={el} />
        ))}
      </div>
    </div>
  );
}

export default CarouselShowcase;
