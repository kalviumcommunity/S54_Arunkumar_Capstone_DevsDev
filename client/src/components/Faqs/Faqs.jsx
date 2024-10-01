import React, { useState } from 'react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      "question": "What is DevsDev?",
      "answer": "DevsDev is a platform for developers and designers to seek advice, share their work, and get suggestions from the community."
    },
    {
      "question": "How can I upload images to get feedback?",
      "answer": "You can upload images by navigating to the 'Home' section, where you can see a 'plus' icon, click and drag and drop your files or select them from your computer."
    },
    {
      "question": "Is DevsDev free to use?",
      "answer": "Yes, DevsDev is completely free to use for all developers and designers."
    },
    {
      "question": "How do I create an account on DevsDev?",
      "answer": "To create an account, click on the 'Sign Up' button on the top right corner and fill in your details."
    },
    {
      "question": "Can I browse designs without an account?",
      "answer": "Yes, you can browse designs and suggestions without an account, but you need to sign up to upload your own work or comment on others."
    },
    {
      "question": "What file formats are supported for image uploads?",
      "answer": "We support JPEG, PNG formats for image uploads."
    },
    {
      "question": "How can I give suggestions on uploaded designs?",
      "answer": "You can give suggestions by clicking on the 'Comment' button under the image and typing your feedback."
    },
    {
      "question": "Is there a way to search designs by community?",
      "answer": "Yes, you can search designs by community using the search bar on the top."
    },
    {
      "question": "Is there a way to search designs by username?",
      "answer": "Yes, you can search designs by username using the search bar on the top."
    },
    {
      "question": "How do I contact support if I have an issue?",
      "answer": "If you have any issues, you can contact our support team by clicking on the 'Help' option at the left side of the page."
    },
    {
      "question": "Can I delete my account?",
      "answer": "Yes, you can delete your account by clicking the 'Manage Account' option in userIcon then scroll down and click on 'Delete Account'."
    },
    // New questions added below
    {
      "question": "How can I change my password?",
      "answer": "You can change your password by going to 'Account Settings', selecting 'Password', and following the instructions to update it."
    },
    {
      "question": "How do I reset my password if I forgot it?",
      "answer": "If you forgot your password, click on 'Forgot Password' at the login screen, and you'll receive an email with instructions to reset it."
    },
    {
      "question": "Can I report inappropriate content?",
      "answer": "Yes, you can report inappropriate content by clicking the 'Report' button below the design or comment you find inappropriate."
    },
    {
      "question": "Does DevsDev offer collaboration features?",
      "answer": "Yes, DevsDev allows you to invite other users to collaborate on designs by sharing the project with their username or email."
    }
  ];
  

  const toggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isOpen = index => {
    return openIndex === index;
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-2 text-center">

    <span className="bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] text-transparent bg-clip-text text-xl font-semibold">How can we help you?</span>


    <div className="w-full px-32 py-4">
        <input
          className="w-full h-10 p-3 rounded-xl bg-[#1E1E1E] outline-none"
          type='text'
          placeholder='Search FAQs'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>    
      <div className="px-28 text-left py-3">
        <div className="overflow-y-auto" style={{ height: '70vh', scrollbarWidth: 'none', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div onClick={() => toggle(index)} className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-md font-semibold">{faq.question}</h3>
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
            ))
          ) : (
            <div className="text-gray-600 text-md mt-4 text-center">No FAQs found for "{searchTerm}". Please try a different search term.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
