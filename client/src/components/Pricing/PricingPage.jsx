import React, { useState } from 'react';
import tickIcon from '../../assets/tick-icon.svg';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const toggleMode = () => {
    setIsYearly(!isYearly);
  };

  const pricing = [
    {
      type: 'Student',
      description: 'Best for students',
      yearlyPrice: '$3',
      monthlyPrice: '$1',
      benefits: ['Credits-10', '2', 'Explore'],
    },
    {
      type: 'Developers',
      description: 'Best for developers',
      yearlyPrice: '$8',
      monthlyPrice: '$2',
      benefits: ['Includes student', 'Credits-15', 'Explore', '', ''],
    },
    {
      type: 'Organization',
      description: 'Best for organization',
      yearlyPrice: '$12',
      monthlyPrice: '$3',
      benefits: ['Student + Developers', 'Credits-25', 'Explore', '4', '5'],
    },
  ];

  return (
    <div className="h-full">
          UpComing
      <div className="w-full flex justify-center">
        <div className="w-80 bg-[#1E1E1E] flex py-2 px-4 justify-between rounded-2xl">
          <button
            className={`w-32 py-1 px-6 rounded-2xl flex justify-center items-center ${
              isYearly ? '' : 'bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF]'
            }`}
            onClick={toggleMode}
          >
            Monthly
          </button>
          <button
            className={`w-32 py-1 px-6 rounded-2xl flex justify-center items-center ${
              isYearly ? 'bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF]' : ''
            }`}
            onClick={toggleMode}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 justify-between items-center pt-20">
        {pricing.map((item, index) => (
          <div
            key={index}
            className={`bg-[#1E1E1E] px-7 py-5 rounded-xl hover:cursor-pointer flex flex-col justify-between ${
              item.type === 'Developers' ? 'h-96' : ''
            }`}
          >
            <p className="text-xl">{item.type}</p>
            <p className="textSmall">{item.description}</p>
            <p className="text-4xl py-4">{isYearly ? item.yearlyPrice : item.monthlyPrice}</p>
            <p>Benefits :</p>
            <ul className="py-2 pl-3 text-xs flex flex-col gap-y-1">
              {item.benefits.map((benefit, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <img src={tickIcon} />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="flex justify-center pt-5">
              <button className="px-6 py-2 text-white bg-gradient-to-bl from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] rounded-2xl">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
