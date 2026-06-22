import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// CLEAN CODE COMMENT:
// We extract the slide markup into a reusable HeroSlide sub-component.
// This prevents duplicating HTML and CSS classes across slides,
// keeping the main Hero carousel component clean and readable.
function HeroSlide({ imageUrl, imageAlt, opacityClass, badgeText, title, description, buttonText, onButtonClick }) {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-start text-left bg-black/80">
      <img
        src={imageUrl}
        alt={imageAlt}
        className={`absolute inset-0 w-full h-full object-cover ${opacityClass}`}
      />
      <div className="relative z-10 max-w-2xl px-6 md:px-16 lg:px-24 space-y-4 text-white">
        <span className="inline-block bg-indigo-600/30 text-indigo-200 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-indigo-500/20">
          {badgeText}
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          {title}
        </h2>
        <p className="text-gray-200 text-xs md:text-sm max-w-md leading-relaxed">
          {description}
        </p>
        <button
          onClick={onButtonClick}
          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition duration-300 shadow-md shadow-indigo-500/20 text-xs md:text-sm"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default function Hero({ deviceType = 'desktop'}) {
  const navigate = useNavigate();

  const handleExplore = () => navigate("/products");

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      customTransition="transform 500ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item"
    >
      <HeroSlide
        imageUrl="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1920&auto=format&fit=crop"
        imageAlt="Cozy reading area"
        opacityClass="opacity-50"
        badgeText="Welcome to BookStore"
        title="Elevate Your Coding Skills 📚"
        description="Discover the best-selling programming and software engineering books handpicked to guide your tech career."
        buttonText="Explore Catalog"
        onButtonClick={handleExplore}
      />

      <HeroSlide
        imageUrl="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1920&auto=format&fit=crop"
        imageAlt="Library shelves"
        opacityClass="opacity-55"
        badgeText="Special Discounts"
        title="Grab Special Book Deals 🚀"
        description="Take advantage of our limited-time promotional sales. Save up to 50% on popular titles and textbook bundles."
        buttonText="View Hot Sales"
        onButtonClick={handleExplore}
      />

      <HeroSlide
        imageUrl="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop"
        imageAlt="Stack of programming books"
        opacityClass="opacity-50"
        badgeText="Verified Publishers"
        title="Learn From Industry Leaders 💻"
        description="Authentic physical and digital books sourced straight from O'Reilly, Manning, Packt, and other top-tier tech publishers."
        buttonText="Browse Collections"
        onButtonClick={handleExplore}
      />
    </Carousel>
  );
}
