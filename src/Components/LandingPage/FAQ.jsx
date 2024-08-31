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
      question: "What is exactly a Truth Chain?",
      answer: "A Truth Chain is concept introduced by Reclaim Protocol and implemented by Shwet. It is a blockchain based network of data containing facts, figures, news, media, claims, etc. by different people, organization and famous personalities around the world with an attested proof of authentication which cannot be modified or unclaimed at anytime or by anyone including the autor and Shwet itself.",
    },
    {
      question: "How can I get started with submitting my own data?",
      answer: "Head over to 'Get Started' button, signup/login if you haven't already, connect your wallet and you are good to go!"
    },
    {
      question: "What is the difference between a traditional media network and Shwet?",
      answer: "Shwet's zktls technology based proof of authentication lets the user take rights of their own data, claim or anything they want to bring to the public without the fear of being duplicated, stolen, copyrighted or modified in any manner. In addition to this, in a traditional media a reader never know if the piece of information they are consuming is actually legit or not, or from where they are orignally coming from. They need to trust a centralized entity based on their reputation that their claim can never be wrong. But who is taking the responsibility? That's where Shwet came into place!",

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
    <div id="faqs-section" className="w-full h-full p-8 bg-primaryBg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">FAQs</h2>
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
