import React from "react";
import { useTranslation } from "react-i18next";
import JobCard from "./JobCard";

/* Images */
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

const FeaturedJobs = () => {
  const { t } = useTranslation();

  const jobCategories = [
    { key: "household", emoji: "🏠", image: householdImg },
    { key: "gardening", emoji: "🌿", image: gardeningImg },
    { key: "moving", emoji: "🚚", image: movingImg },
    { key: "restaurant", emoji: "🍽️", image: restaurantImg },
    { key: "childcare", emoji: "👶", image: childcareImg },
    { key: "petcare", emoji: "🐾", image: petcareImg },
    { key: "delivery", emoji: "🚴", image: deliveryImg },
    { key: "office", emoji: "💼", image: officeImg },
    { key: "tutoring", emoji: "📚", image: tutoringImg },
    { key: "event", emoji: "🎤", image: eventImg },
    { key: "it", emoji: "💻", image: itImg },
    { key: "creative", emoji: "🎨", image: creativeImg },
  ];

  return (
    <section id="featured-jobs" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-500 mb-4">
        {t("featuredJobs.title")}
      </h2>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        {t("featuredJobs.subtitle")}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobCategories.map((job, index) => (
          <JobCard
            key={index}
            job={{
              key: job.key, // important for i18n popup
              title: t(`featuredJobs.categories.${job.key}.title`),
              subtitle: t(`featuredJobs.categories.${job.key}.subtitle`),
              description: t(
                `featuredJobs.categories.${job.key}.description`
              ),
              emoji: job.emoji,
              image: job.image,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
