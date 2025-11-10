import React, { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideInterval = useRef(null);
  const progressInterval = useRef(null);

  const slideAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(1.05)" },
    config: { tension: 100, friction: 20 },
    reset: true,
  });


  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("http://localhost:5000/sliders");
        const data = await res.json();
        console.log("Slides fetched:", data);
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch slides:", err);
      }
    };
    fetchSlides();
  }, []);


  useEffect(() => {
    if (!paused && slides.length > 0) {
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
  }, [paused, slides]);

  const touchStart = useRef(0);
  const handleTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

  if (slides.length === 0)
    return (
      <div className="w-full h-[500px] flex items-center justify-center text-gray-500">
        Loading slides...
      </div>
    );

  return (
    <div
      className="relative w-full h-[300px] md:h-[300px] overflow-hidden rounded-2xl shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
     
      {slides.map((slide, index) => {
        const imageSrc = slide.image?.startsWith("http")
          ? slide.image
          : slide.posterUrl?.startsWith("http")
          ? slide.posterUrl
          : slide.url?.startsWith("http")
          ? slide.url
          : `http://localhost:5000/${slide.image || slide.posterUrl || slide.url}`;

        return (
          <div
            key={slide._id || slide.id || index}
            style={index === currentSlide ? slideAnimation : { display: "none" }}
            className={`absolute inset-0 transition-opacity duration-700 `}
          >
            <img
              src={imageSrc}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.warn("Image failed to load:", imageSrc);
                e.target.src = "https://via.placeholder.com/1200x600?text=No+Image";
              }}
            />
          </div>
        );
      })}

 
      <div className="absolute flex justify-between items-center inset-x-3 top-1/2 transform -translate-y-1/2">
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
    </div>
  );
};

export default HeroSlider;
