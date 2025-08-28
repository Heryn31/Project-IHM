import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [prices, setPrices] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/prices") 
      .then((res) => {
        // Transform the data to match chart requirements
        const transformedData = res.data.map(item => ({
          name: item.type,        // Use 'type' as the category name
          amount: item.amount,    // Use 'amount' as the value
          currency: item.currency,
          id: item._id           // Keep original ID if needed
        }));
        setPrices(transformedData);
      })
      .catch((err) => {
        console.error("Erreur fetch prices:", err);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 800 }}>
      <ResponsiveContainer>
        <BarChart
          data={prices}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value}`, 'Montant']}
            labelFormatter={(label) => `Type: ${label}`}
          />
          <Legend />
          <Bar dataKey="amount" fill="#00a33fff" name="Montant" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;