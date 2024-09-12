"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-100 via-blue-200 to-white min-h-screen text-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center lg:justify-between">
        {/* Hero Text Section */}
        <motion.div
          className="mx-auto max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-4xl font-extrabold sm:text-6xl">
            Manage Your Expense Effortlessly
            <span className="block text-blue-500 mt-2 sm:mt-4">
              Control Your Finances
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-2xl text-gray-700">
            <strong>
              Escape financial stress and take control of your money with ease.
            </strong>
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="/dashboard"
              className="block w-full rounded-xl bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/sign-up"
              className="block w-full rounded-xl bg-gray-100 text-blue-600 px-12 py-3 text-sm font-medium shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 focus:outline-none focus:ring sm:w-auto"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mt-10 lg:mt-0 lg:ml-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          <img
            className="rounded-2xl shadow-2xl object-cover w-full max-w-lg"
            src="./Expense.webp" // Example image path, update it based on your assets
            alt="Manage Finances"
          />
        </motion.div>
      </div>

      {/* Features Section with Glassmorphism */}
      <div className="py-20 bg-gradient-to-b from-transparent to-blue-900">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
          {[ 
            {
              title: "Real-Time Expense Tracking",
              description:
                "Track your expenses in real-time with our intuitive dashboard.",
              icon: "📊",
            },
            {
              title: "Budget Planning",
              description:
                "Plan your budgets effectively and achieve your financial goals.",
              icon: "📝",
            },
            {
              title: "Detailed Reports",
              description:
                "Get comprehensive reports to better understand your spending.",
              icon: "📈",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white/30 backdrop-blur-md rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.3 }}
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section with Parallax Effect */}
      <div className="py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('./parallex.avif')" }}>
        <div className="container mx-auto text-center text-white">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            Ready to take control of your finances?
          </motion.h2>
          <p className="mb-8">
            Sign up today and start managing your expenses like a pro.
          </p>

          <Link
            href="/sign-up"
            className="rounded bg-blue-600 px-10 py-3 font-medium text-white shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
