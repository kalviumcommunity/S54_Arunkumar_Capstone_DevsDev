import React, { useState } from 'react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
        "question":"Issue1",
        "answer":"Answer Statement for Issue1"
    },
    {
        "question":"Issue2",
        "answer":"Answer Statement for Issue2"
    },
    {
        "question":"Issue3",
        "answer":"Answer Statement for Issue3Answer Statement for Issue3Answer Statement for Issue3Answer Statement for Issue3Answer Statement for Issue3Answer Statement for Issue3Answer Statement for Issue3Answer StAnswer Statement for Issue3atement for Issue3Answer Statement for Issue3Answer Statement for Issue3Answer Statement for Issue3 Answer Statement for Issue3Answer Statement for Issue3"
    },
    {
        "question":"Issue4",
        "answer":"Answer Statement for Issue4"
    },
]

  const toggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isOpen = index => {
    return openIndex === index;
  };

  return (
    <div className="pt-2 text-center">

    <span className="bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-xl font-semibold">How can we help you?</span>


    <div className="w-full px-32 py-4">
        <input className="w-full h-10 p-3 rounded-xl bg-[#1E1E1E] outline-none" type='text' placeholder='Describe your issue' />
    </div>    
    <div className="px-28 text-left py-3">
      <div className="">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div onClick={() => toggle(index)} className="flex justify-between items-center cursor-pointer">
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            {isOpen(index) ? (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
          <div className="p-4">
            {isOpen(index) && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};

export default Faqs;
