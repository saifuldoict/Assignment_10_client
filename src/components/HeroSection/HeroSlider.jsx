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

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("http://localhost:5000/sliders");
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch slides:", err);
      }
    };
    fetchSlides();
  }, []);

  // Auto slide
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

  if (slides.length === 0) return <div>Loading slides...</div>;

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <animated.div
          key={slide.id}
          style={index === currentSlide ? slideAnimation : { display: "none" }}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image} // make sure your API returns `image` field
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </animated.div>
      ))}

      {/* Navigation buttons */}
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

      {/* Dots indicator */}
      <div className="absolute bottom-6 flex justify-center w-full gap-3">
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

      {/* Progress bar */}
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
