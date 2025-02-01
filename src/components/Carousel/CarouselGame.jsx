import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { isiCarousel } from "../../assets/data";
import "./CarouselGame.css";

function CarouselGame() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Button className="custom-button button-login">
        LOGIN
      </Button>

      <Carousel
        className="carousel-game"
        activeIndex={index}
        onSelect={handleSelect}
        fade
      >
        {isiCarousel.map((bagian, urutan) => (
          <Carousel.Item key={urutan}>
            <img
              className={`d-block w-100 ${bagian.customGambar}`}
              src={bagian.src}
              alt={`${bagian.title} image`}
            />
            <Carousel.Caption className="rounded-caption">
              <h5>{bagian.title}</h5>
              <p>{bagian.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselGame;
