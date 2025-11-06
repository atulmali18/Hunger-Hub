import React from "react";
import { FiClock, FiShield, FiTruck, FiHeadphones, FiAward, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <FiTruck className="w-8 h-8 text-orange-500" />,
      title: "Fast Delivery",
      description: "Get your food delivered within 30 minutes of placing your order. Hot and fresh, guaranteed!"
    },
    {
      icon: <FiClock className="w-8 h-8 text-orange-500" />,
      title: "24/7 Service",
      description: "We're always here for you. Order your favorite meals anytime, day or night."
    },
    {
      icon: <FiShield className="w-8 h-8 text-orange-500" />,
      title: "Secure Payment",
      description: "Your payments are 100% secure with our encrypted payment gateway. Multiple payment options available."
    },
    {
      icon: <FiHeadphones className="w-8 h-8 text-orange-500" />,
      title: "Customer Support",
      description: "Our dedicated support team is always ready to help you with any questions or concerns."
    },
    {
      icon: <FiAward className="w-8 h-8 text-orange-500" />,
      title: "Quality Food",
      description: "We partner with the best restaurants to bring you high-quality, delicious meals every time."
    },
    {
      icon: <FiHeart className="w-8 h-8 text-orange-500" />,
      title: "Healthy Options",
      description: "Choose from a wide variety of healthy and nutritious meals that taste great and make you feel good."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Experience the best food delivery service with exceptional quality and unmatched convenience
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Hunger Hub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to providing you with the best food delivery experience possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-orange-50 p-4 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">50K+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">500+</h3>
              <p className="text-gray-600">Partner Restaurants</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">30min</h3>
              <p className="text-gray-600">Average Delivery</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">24/7</h3>
              <p className="text-gray-600">Available Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Experience our amazing service today!
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;