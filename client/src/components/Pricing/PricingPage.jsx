import React from 'react'

const PricingPage = () => {

  const premiumSub = [
    {
      name:"student",
      rs1:"",
      rs2:"",
      desc:"",
      adv:["",""]
    },
    {
      name:"ProPlus",
      rs1:"",
      rs2:"",
      desc:"",
      adv:["",""]
    },
    {
      name:"EliteXperience",
      rs1:"",
      rs2:"",
      desc:"",
      adv:["",""]
    }
  ]
  

  return (
    <div className="flex">
      <div>Student</div>
      <div>ProPlus</div>
      <div>EliteXperience</div>
    </div>
  )
}

export default PricingPage