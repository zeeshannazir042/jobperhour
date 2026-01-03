import React from "react";
import { useTranslation } from "react-i18next";
import BlogCard from "./BlogCard";

import blog1Img from "../assets/images/Blogs/student.jpg";
import blog2Img from "../assets/images/Blogs/visa.jpg";
import blog3Img from "../assets/images/Blogs/advice.jpg";

const images = [blog1Img, blog2Img, blog3Img]; // image mapping

const BlogSection = () => {
  const { t } = useTranslation();
  const posts = t("blog.posts", { returnObjects: true });

  return (
    <section className="relative py-24 bg-[#0e0e0e]">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[400px] bg-orange-500 opacity-20 blur-[160px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          {t("blog.title")}
        </h2>

        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-8 animate-pulse"></div>

        <p className="text-center text-gray-400 mb-14 max-w-3xl mx-auto text-lg leading-relaxed">
          {t("blog.subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              blog={{
                ...post,
                image: images[index],
                link: `/blog/${post.title.replace(/\s+/g, "-").toLowerCase()}`,
                readMore: t("blog.readMore"),
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
