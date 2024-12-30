"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaWallet, FaLeaf } from "react-icons/fa";

const AboutSection = () => {
  const features = [
    {
      icon: <FaGlobe className="text-4xl text-black  mb-4" />,
      title: "Access Global Products",
      description:
        "Get items from around the world that are not available or are too expensive in your country.",
    },
    {
      icon: <FaWallet className="text-4xl text-black mb-4" />,
      title: "Earn While Traveling",
      description:
        "Travelers can make extra money by delivering items along their route.",
    },
    {
      icon: <FaLeaf className="text-4xl text-black mb-4" />,
      title: "Sustainable Deliveries",
      description:
        "Reduce carbon emissions by utilizing existing travel routes for deliveries.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-black">Why Use Jibli ?</h2>
        <div className="flex flex-wrap -mx-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full md:w-1/3 px-4 mb-12 flex"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="border-2 border-black p-6 rounded-3xl hover:shadow-2xl transition flex flex-col w-full h-full">
                <div className="flex items-center justify-center mb-4">
                  <div className="text-4xl text-black">{feature.icon}</div>
                </div>
                <h3 className="text-3xl text-black capitalize font-semibold mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-black text-center flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
