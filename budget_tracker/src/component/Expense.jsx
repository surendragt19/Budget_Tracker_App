// src/component/Expense.jsx

import React, { useEffect, useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";

function Expense(props) {

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      location.href="/login"
    }
  },[])

  let { id } = useParams();

  const [expenses, setExpenses] = useState({});
  const [expAdd, setExpAdd] = useState(true);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  async function fetchExpenses() {
    try {
      const response = await fetch(`/budget/${id}/expenses`, {
        headers: {
          Authorization: localStorage.getItem('token'), // Assuming token is stored in local storage
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      console.log(data.data)
      if(data.data){
        setExpenses(data.data);
      }
    

    } catch (error) {
      console.log(error.message)
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
   
    fetchExpenses();
  }, [id]); // Runs whenever budgetId changes

  useEffect(() => {
    fetchExpenses();
  }, [expAdd]); // Runs whenever budgetId changes


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/budget/${id}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'), // Assuming token is stored in local storage
        },
        body: JSON.stringify({ name, amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const data = await response.json();
      console.log('Expense added:', data);
      alert("added")
      setExpAdd(!expAdd)
      // Handle success: e.g., show a success message or update the UI
    } catch (error) {
      console.error('Error adding expense:', error);
      // Handle error: e.g., show an error message to the user
    }
  };

  return (
    <>
    <div><h1 className="logo"><u>GFG Budget Tracker</u></h1></div>
    <h3 style={{marginTop:'40px',marginBottom:'40px',textAlign:'center'}}>Budget Name :{expenses.name}</h3>
      <div className="float-container">
        <div className="first-child">
          <form className="form_exp" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Expense Name..."
              className="input_exp"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="input_exp" />
            <input type="submit" value="Add" className="btn_exp" />
          </form>
        </div>

        <div className="second-child">
          <h1 className="text_exp">List of Expenses</h1>
          <ul className="newul">
            {expenses?.budgets?.expenses?.map((item)=>{
              return(
                <li className="li_exp">
              <span className="name_exp">{item.name}</span>
              <span className="a_exp">{item.amount}</span>
              
            </li>
            
              )
            })}
          </ul>
        </div>
      </div>
      <div className="outer_div">
        <div className="outer_btn">Budget:{expenses.total}</div>
        <div className="outer_btn" style={{ backgroundColor: "red" }}>
          Used:{expenses.used}
        </div>
        <div className="outer_btn" style={{ backgroundColor: "green" }}>
          Left:{expenses.available}
        </div>
      </div>
    </>
  );
}

export default Expense;
