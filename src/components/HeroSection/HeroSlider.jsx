import React, { useEffect, useState, useRef } from "react";
import { FaPaw } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const slides = [
  {
    id: 1,
    image: "https://www.shutterstock.com/image-photo/funny-jack-russell-terrier-dog-260nw-2596597293.jpg",
    title: "Keep Your Pet Warm This Winter",
    description:
      "From fluffy coats to cozy blankets — we make sure your pets enjoy the cold season in comfort and style.",
    buttonText: "Explore Winter Care",
    buttonColor: "bg-[#d72050] hover:bg-[#b61c43]",
  },
  {
    id: 2,
    image: "https://www.shutterstock.com/shutterstock/videos/3666353249/thumb/1.jpg?ip=x480",
    title: "Adorable Sweaters for Furry Friends",
    description:
      "Discover our handmade winter outfits — soft, stylish, and purr-fectly snug.",
    buttonText: "Shop Sweaters",
    buttonColor: "bg-[#37cdbe] hover:bg-[#2da99e]",
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505_640.jpg",
    title: "Gentle Care for Every Pet",
    description:
      "Keep small pets cozy too — with safe heating and soft bedding options.",
    buttonText: "Learn More",
    buttonColor: "bg-[#f59e0b] hover:bg-[#d97706]",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideInterval = useRef(null);
  const progressInterval = useRef(null);


  const slideAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0%)",
    from: { opacity: 0, transform: "translateX(20%)" },
    config: { tension: 150, friction: 20 },
    reset: true,
  });


  useEffect(() => {
    if (!paused) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      progressInterval.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 2));
      }, 100);
    }

    return () => {
      clearInterval(slideInterval.current);
      clearInterval(progressInterval.current);
    };
  }, [paused]);


  const touchStart = useRef(0);
  const handleTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  const nextSlide = () =>
    setCurrentSlide((currentSlide + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <div
      className="relative w-full h-[500px] rounded-2xl shadow-xl overflow-hidden bg-base-200 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <animated.div
          key={slide.id}
          style={index === currentSlide ? slideAnimation : { display: "none" }}
          className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between w-full transition-all duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
  
          <div className="w-full md:w-1/2 h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>

     
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-[#fefefe] to-[#f7f3f3] text-gray-800">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#403f3f]">
              {slide.title}
            </h1>
            <p className="text-lg mb-6 text-[#555]">{slide.description}</p>
            <button
              className={`btn border-none text-white flex items-center gap-2 ${slide.buttonColor}`}
            >
              <FaPaw /> {slide.buttonText}
            </button>
          </div>
        </animated.div>
      ))}

     
      <div className="absolute flex justify-between transform -translate-y-1/2 left-3 right-3 top-1/2">
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-[#ffffffaa] hover:bg-white text-gray-700 border-none"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-[#ffffffaa] hover:bg-white text-gray-700 border-none"
        >
          ❯
        </button>
      </div>

   
      <div className="absolute bottom-8 flex justify-center w-full gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentSlide ? "bg-[#d72050]" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>


      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
        <div
          className="h-1 bg-[#d72050] transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HeroSlider;