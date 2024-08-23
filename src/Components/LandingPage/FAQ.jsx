import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border border-gray-700 rounded-lg mb-4 ${isOpen ? 'bg-primaryBg' : ''}`}>
      <button
        className="flex justify-between items-center w-full p-4 text-left text-white bg-gray-800 rounded-lg"
        onClick={onClick}
      >
        <span>{question}</span>
        <FaChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 text-gray-400 bg-gray-900 rounded-lg">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How do I hire dedicated developers or team?",
      answer: "You can hire developers through our hiring platform or contact our sales team.",
    },
    {
      question: "What our developers can do for you?",
      answer: "Our developers can build, scale, and maintain your software solutions.",
    },
    {
      question: "Why hire dedicated developers?",
      answer: "Dedicated developers ensure focused and consistent progress on your project.",
    },
    {
      question: "How much does it cost to hire developers?",
      answer: "The cost depends on the developers' expertise and the project requirements.",
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full p-8 bg-primaryBg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">FAQ</h2>
      <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>
      <div className="max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
