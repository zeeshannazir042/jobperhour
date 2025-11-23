import React from "react";
import JobCard from "./JobCard";

// Import your local images

import householdImg from "../assets/Images/Homepage/house-and-cleaning.jpg";
import gardeningImg from "../assets/Images/Homepage/gardening.jpg";
import movingImg from "../assets/Images/Homepage/shifting.jpg";
import restaurantImg from "../assets/Images/Homepage/restrurent.jpg";
import childcareImg from "../assets/Images/Homepage/babysitter.jpg";
import petcareImg from "../assets/Images/Homepage/pet.jpg";
import deliveryImg from "../assets/Images/Homepage/delivery-courier.jpg";
import officeImg from "../assets/Images/Homepage/Office & Admin Support.jpeg";
import tutoringImg from "../assets/Images/Homepage/teaching.jpg";
import eventImg from "../assets/Images/Homepage/event.jpg";
import itImg from "../assets/Images/Homepage/it.jpg";
import creativeImg from "../assets/Images/Homepage/creative-design.jpg";



const jobCategories = [
  {
    title: "Household & Cleaning",
    emoji: "🏠",
    subtitle: "Household jobs in Berlin",
    description:
      "Turn Chaos into Cozy — Make Berlin Homes Shine! Apartment cleaning, laundry, ironing — help busy Berliners keep things spotless while earning steady pay.",
    image: householdImg,
  },
  {
    title: "Gardening & Outdoor",
    emoji: "🌿",
    subtitle: "Gardening jobs in Berlin",
    description:
      "Green Fingers Wanted — Grow, Trim, and Thrive! Lawn mowing, planting, or clearing snow — enjoy Berlin’s fresh air while helping gardens bloom.",
    image: gardeningImg,
  },
  {
    title: "Moving & Transport",
    emoji: "🚚",
    subtitle: "Moving jobs in Berlin",
    description:
      "Berlin on the Move — Help Carry the City! Lend a hand with furniture, packing, and van loading. Fast jobs, fast pay, real teamwork.",
    image: movingImg,
  },
  {
    title: "Restaurant & Café",
    emoji: "🍽️",
    subtitle: "Restaurant jobs in Berlin",
    description:
      "Restaurant Hustle — Serve, Smile, and Soak Up the Vibes! Wait tables, assist in the kitchen, or clean up — be part of Berlin’s buzzing food scene.",
    image: restaurantImg,
  },
  {
    title: "Babysitting & Childcare",
    emoji: "👶",
    subtitle: "Childcare jobs in Berlin",
    description:
      "Little Smiles, Big Hearts — Your Care Makes a Difference! Babysit, tutor, or nanny — help Berlin families with trusted childcare.",
    image: childcareImg,
  },
  {
    title: "Pet Care",
    emoji: "🐾",
    subtitle: "Pet care jobs in Berlin",
    description:
      "Furry Friends Need You — Walk, Feed, or Cuddle! Dog walking, pet sitting, or feeding — earn money while spending time with animals.",
    image: petcareImg,
  },
  {
    title: "Delivery & Courier",
    emoji: "🚴",
    subtitle: "Delivery jobs in Berlin",
    description:
      "Speed through Berlin on your bike or scooter — deliver food, parcels, or documents. Flexible hours and great for students who love being outdoors!",
    image: deliveryImg,
  },
  {
    title: "Office & Admin Support",
    emoji: "💼",
    subtitle: "Office support jobs in Berlin",
    description:
      "Assist Berlin’s startups and small businesses — handle data entry, emails, or reception tasks. Gain real office experience while earning hourly pay.",
    image: officeImg,
  },
  {
    title: "Tutoring & Teaching",
    emoji: "📚",
    subtitle: "Tutoring jobs in Berlin",
    description:
      "Share your knowledge! Teach English, math, or other subjects to students across Berlin — in-person or online, flexible scheduling available.",
    image: tutoringImg,
  },
  {
    title: "Event & Promotion",
    emoji: "🎤",
    subtitle: "Event jobs in Berlin",
    description:
      "Help organize Berlin’s concerts, exhibitions, and festivals — from ticketing and setup to guest management. Perfect for social, energetic workers!",
    image: eventImg,
  },
  {
    title: "IT & Technical Support",
    emoji: "💻",
    subtitle: "IT jobs in Berlin",
    description:
      "Work with local startups or tech companies — help with software updates, websites, or troubleshooting. Great for tech-savvy students!",
    image: itImg,
  },
  {
    title: "Creative & Design",
    emoji: "🎨",
    subtitle: "Creative jobs in Berlin",
    description:
      "Put your artistic skills to use — graphic design, photography, video editing, or content creation. Help Berlin’s businesses stand out visually!",
    image: creativeImg,
  },
];

const FeaturedJobs = () => {
  return (
    <section id="featured-jobs" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-4">
        Featured Jobs
      </h2>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore flexible and local job opportunities in Berlin — find the right role for you!
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobCategories.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
