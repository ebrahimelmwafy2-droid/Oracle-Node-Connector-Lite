// OracleEngine.js - قلب المكتبة بتاعتك
import React, { useState, useEffect } from 'react';

// دي الـ Library اللي بتخلي الربط بـ Oracle بـ 3 سطور بس
export const useOracleConnector = (apiURL) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const result = await response.json();
        setData(result);
        setStatus('Synced 🚀');
      } catch (err) {
        setStatus('Connection Failed ❌');
      }
    };
    fetchData();
  }, [apiURL]);

  return { data, status };
};