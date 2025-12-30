import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Images
import aboutImg from "../assets/images/community/herocommunity.jpg";
import missionImg from "../assets/images/About/mission.jpg";
import visionImg from "../assets/images/About/vision.jpg";
import sauravImg from "../assets/images/founders/saurav.jpeg";
import zeeshanImg from "../assets/images/founders/zeeshan.png";

const fadeUp = {
  hidden: { opacity: 1, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const AboutPage = () => {
  const founders = [
    {
      img: sauravImg,
      name: "Saurav Sharma",
      role: "Founder & CEO",
      desc: `Saurav brings over a decade of experience leading teams and managing complex projects in global organizations, including Lovely Professional University and Concentrix (ex-IBM).
He personally experienced the gap for newcomers in Berlin and envisioned a platform that builds trust and community. He holds a Global MBA from BSBI with certifications in Project Management, Six Sigma, Operations Management, and Digital Marketing.
Role: Vision, business strategy, partnerships, operations, fundraising, Team building and impact`,
    },
    {
      img: zeeshanImg,
      name: "Zeeshan Nazir",
      role: "Technical Co-Founder",
      desc: `Full-Stack Expertise: Proficient in React.js, Node.js, MongoDB, and cloud deployment. Exact stack needed to build and scale our platform.
Proven Project Builder: Built and deployed complex web apps including a Project Management Dashboard and an E-Commerce Platform processing high transaction volumes.
Results-Driven Engineering: Optimized system performance, improving load speeds by 30% and reducing checkout times.
Planned Role: End-to-end technical execution, platform architecture, security, and scaling.`,
    },
  ];

  const missionVision = [
    {
      title: "Mission Statement",
      img: missionImg,
      text: "To turn Berlin’s isolation into connection by building a trusted, hyper-local platform where every neighbour can find help, offer skills, and belong.",
    },
    {
      title: "Vision Statement",
      img: visionImg,
      text: "To become Europe’s leading community platform, redefining city life through trust, flexibility, and neighbourly support. JobsPerHour Berlin is the blueprint for a replicable model that turns hyper-local connections into scalable solutions for social integration and resilient local economies across Germany and Europe.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Hero Section */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-soft backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl p-10 border border-white/10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
          >
            
            <span className="text-white">About Us</span><br />
            <span className="inline-block px-4 py-1 rounded-lg bg-white/80 text-gray-900 backdrop-blur-sm shadow-lg">JobsPerHour<span className="text-orange-400">Berlin</span></span>
            
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md"
          >
            A hyper-local platform connecting Berliners through trusted, flexible, neighbourhood-based work.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 mx-auto h-1 w-24 bg-orange-400 rounded-full"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 backdrop-blur-sm hover:shadow-orange-400/30 transition-shadow duration-500"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">The Team Behind the Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              JobsPerHour Berlin was founded by Saurav Sharma and Zeeshan Nazir, a duo united by firsthand experience of Berlin’s “isolation paradox” and a shared vision to build community through local, trusted work.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              “When we first arrived in Berlin, we saw talented people with so much to offer, but no way to connect meaningfully with the community around them. This platform is the bridge we wish we had.”
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 font-semibold">
             Our Goal: To turn strangers into neighbours, and neighbours into helpers, building a Berlin where no one feels invisible.
            </p>
          </motion.div>
          <motion.img
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            src={aboutImg}
            alt="Community"
            className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-28 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-orange-400 text-center">Mission & Vision</h2>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            {missionVision.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group rounded-3xl shadow-2xl overflow-hidden transition-transform hover:scale-105 bg-white/30 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-3 text-orange-400">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20 text-orange-400">Founders & Leadership</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((person, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform border border-white/20 dark:border-gray-700 backdrop-blur-md"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 mb-6"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{person.name}</h3>
                <p className="text-orange-400 font-medium mb-4">{person.role}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">{person.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @keyframes fadeSoft {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-soft {
          animation: fadeSoft 1.4s ease-out forwards;
        }

        /* Floating particles */
        .particle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: floatUp 6s infinite ease-in-out;
          left: 20%;
          bottom: -10px;
        }
        .particle.delay1 {
          left: 60%;
          animation-delay: 1s;
        }
        .particle.delay2 {
          left: 40%;
          animation-delay: 2s;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { opacity: 1; }
          100% { transform: translateY(-500px) scale(0.4); opacity: 0; }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default AboutPage;
