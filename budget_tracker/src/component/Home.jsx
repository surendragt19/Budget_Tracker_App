// src/component/Home.jsx

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function Home() {
const [budget,setBudgets]=useState([]);
const [name,setName]=useState('')
const [amount,setAmount]=useState(0)
const [budAdd, setAddBud] = useState(true);

const token = localStorage.getItem('token');

 async function fetchBudgets(){
    try {
      const response = await fetch('http://localhost:3000/budget', {
        headers: {
          Authorization:token, // Assuming token is stored in local storage
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch budgets');
      }
      const data = await response.json();
      console.log(data)
      setBudgets(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    
    }
  };


 
useEffect(() => {
  if(!localStorage.getItem('token')){
    location.href="/login"
  }
    fetchBudgets();
  }, []); // Runs only once on component mount


  useEffect(() => {
    fetchBudgets();
  }, [budAdd]); // Runs only once on component mount


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await fetch('/budget/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:token,
        },
        body: JSON.stringify({ name, totalAmount:amount }),
      });
      const data = await response.json();
      console.log('Budget created:', data);
      alert("Budget created")
      setAddBud(!budAdd)
      
    } catch (error) {
      console.error('Error creating budget:', error);
      alert("Error creating budget")
     
    }
  };
  return (
   <>
   <div><h1 className="logoHome" style={{padding:'20px', marginLeft:'19%', color:'green'}}><u>GFG Budget Tracker</u></h1></div>
   <div className='main1'>
  
   <form className='f1' onSubmit={handleSubmit} method='POST'>
  <input type="text"
  min="1"
  className='input1'
  placeholder='Enter Expense Name'
  value={name}
  onChange={(e)=>setName(e.target.value)}
  />
  <input type="number"
  min="1"
  className='input1'
  placeholder='Input Amount'
  value={amount}
  onChange={(e)=>setAmount(e.target.value)}
  />
  <br/>
  <input type="submit"
  value="Add"
  className='btn1'
  />
  </form>
  </div>

  <div className='grid'>

  {budget?.map((bud, index) => (
          
            <div className='inner1'>
    <div className='in1' >Expense Name : {bud.name} </div>
    <div className='in2'> Amount :  {bud.totalAmount}</div>
    <Link to={`expense/${bud._id}`}> <button className='btn_exp'>Open Budget</button></Link>
    </div>
          ))}

</div>

   </>

  )
}

export default Home