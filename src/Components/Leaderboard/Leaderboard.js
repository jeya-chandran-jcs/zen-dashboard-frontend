import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css'; // You can create a CSS file for styling
import {API} from "../../global.js"

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found. Please log in.');
        return;
      }

      // Set up the request with the token in the headers
      const response = await axios.get(`${API}/api/leaderboard/get`, {
        headers: {
          'x-auth-token': token
        }
      });

      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Batch</th>
            <th>Learning</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry,idx) => (
            <tr key={entry._id}>
              <td>{idx+1}</td>
              <td>{entry.name}</td>
              <td>B54WD Tamil</td>
              <td>{entry.learning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
