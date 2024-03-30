import React from 'react'
import tickIcon from '../../assets/tick-icon.svg'

const PricingPage = () => {
  

  return (
    <div className="h-full" >
    
      <div className="w-full flex justify-center">
        <div className="w-80 bg-[#1E1E1E] flex py-2 px-4 justify-between rounded-2xl">
          <button className="w-32 bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] py-1 px-6 rounded-2xl flex justify-center items-center">Yearly</button>
          <button className="w-32 bg-gradient-to-r from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] py-1 px-6 rounded-2xl flex justify-center items-center">Monthly</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 justify-between items-center pt-20">

        <div className="bg-[#1E1E1E] px-7 py-5 rounded-xl hover:cursor-pointer flex flex-col justify-between">
          <p className="text-xl">Student</p>
          <p className="textSmall">best for students</p>
          <p className="text-4xl py-4" >$0</p>
          <p>Benifits :</p>
          <ul className="py-2 pl-3 text-xs flex flex-col gap-y-1" >
            <li className="flex gap-3 items-center"><img src={tickIcon} /> credits-10</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>Explore</li>
          </ul>
          <div className="flex justify-center pt-5"><button className="px-6 py-2 text-white bg-gradient-to-bl from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] rounded-2xl">Get Started</button></div>
        </div>

        <div className="bg-[#1E1E1E] px-7 py-6 rounded-xl h-96 hover:cursor-pointer flex flex-col justify-between " >
          <p className="text-xl">Developers</p>
          <p className="textSmall">best for developers</p>
          <p className="text-4xl py-4" >$0</p>
          <p>Benifits :</p>
          <ul className="py-2 pl-3 text-xs " >
            <li className="flex gap-3 items-center"><img src={tickIcon} /> includes student</li>
            <li className="flex gap-3 items-center"><img src={tickIcon} /> credits-15</li>
            <li className="flex gap-3 items-center"><img src={tickIcon} /> includes student</li>
            <li className="flex gap-3 items-center"><img src={tickIcon} /> includes student</li>
            <li className="flex gap-3 items-center"><img src={tickIcon} /> includes student</li>
          </ul>
          <div className="flex justify-center pt-2"><button className="px-6 py-2 text-white bg-gradient-to-bl from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] rounded-2xl">Get Started</button></div>
        </div>

        <div className="bg-[#1E1E1E] px-7 py-5 rounded-xl hover:cursor-pointer flex flex-col justify-between">
          <p className="text-xl">Organization</p>
          <p className="textSmall">best for organization</p>
          <p className="text-4xl py-4" >$0</p>
          <p>Benifits :</p>
          <ul className="py-2 pl-3 text-xs gap-y-1" >

            <li className="flex gap-3 items-center"><img src={tickIcon} /> includes student + developer</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>

          </ul>
          <div className="flex justify-center pt-5 "><button className="px-6 py-2 text-white bg-gradient-to-bl from-[#FE5F6E] via-[#923CFF] to-[#2B7CFF] rounded-2xl">Get Started</button></div>
        </div>
        
      </div>
    </div>
  )
}

export default PricingPage