import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useMotionEffect(value, range) {
  return useTransform(value, [0, 1], [-range, range]);
}

const Pricing = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const dailyMotion = useMotionEffect(scrollYProgress, 50);
  const weeklyMotion = useMotionEffect(scrollYProgress, 70);
  const monthlyMotion = useMotionEffect(scrollYProgress, 90);

  const plans = [
    {
      title: "Daily Plan",
      price: "$29/day",
      features: [
        "Unlimited Miles",
        "Free Support",
        "Fuel Assistance",
        "GPS Navigation",
      ],
      motionValue: dailyMotion,
    },
    {
      title: "Weekly Plan",
      price: "$149/week",
      features: [
        "Unlimited Miles",
        "Free Support",
        "Discount on Services",
        "GPS Navigation",
      ],
      motionValue: weeklyMotion,
    },
    {
      title: "Monthly Plan",
      price: "$499/month",
      features: [
        "Unlimited Miles",
        "24/7 Support",
        "Discount on Rentals",
        "Free Maintenance",
      ],
      motionValue: monthlyMotion,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4"
    >
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-12">
          Flexible <span className="text-yellow-500">Pricing Plans</span>
        </h2>

        {/* Pricing Tables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 relative overflow-hidden hover:scale-105 transform transition-transform duration-300"
              style={{ y: plan.motionValue }}
            >
              {/* Plan Title */}
              <h3 className="text-2xl font-semibold text-center text-yellow-500">
                {plan.title}
              </h3>

              {/* Price */}
              <p className="text-4xl font-bold text-center mt-4 mb-6">
                {plan.price}
              </p>

              {/* Features List */}
              <ul className="space-y-3 text-gray-300 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Call-to-Action Button */}
              <div className="text-center">
                <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
