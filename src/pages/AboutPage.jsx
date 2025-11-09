// AboutPage.jsx
import React from "react";
import "animate.css";

const features = [
  {
    title: "Browse Movies",
    description:
      "Explore an extensive library of movies across all genres with detailed information, ratings, and reviews.",
  },
  {
    title: "Personal Collection",
    description:
      "Add your favorite movies to your personal collection and manage them easily, keeping track of what you've watched.",
  },
  {
    title: "Top-Rated Movies",
    description:
      "Discover the highest-rated movies on the platform, curated based on user ratings and reviews.",
  },
  {
    title: "Recently Added",
    description:
      "Stay updated with the latest movies added to the platform every day.",
  },
  {
    title: "User Profiles",
    description:
      "Create and manage your profile, track your collection, and interact with other movie lovers.",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-[#FF2DD1]">
      <section
        id="features"
        className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30"
      >
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider animate__animated animate__fadeInDown">
            Why MovieMaster Pro
          </span>
          <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl animate__animated animate__fadeIn">
            The Ultimate Movie Management Platform
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400 animate__animated animate__fadeIn animate__delay-1s">
            MovieMaster Pro helps you browse, organize, and discover movies easily.
            Keep track of your favorite films, explore top-rated titles, and stay updated with the latest releases—all in one platform.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow animate__animated animate__fadeInUp animate__delay-${index + 1}s`}
            >
              <h3 className="mt-6 text-gray-400 text-xl font-semibold">{feature.title}</h3>
              <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
