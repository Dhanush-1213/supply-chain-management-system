import React, { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/top-products")
      .then((response) => setProducts(response.data.data || []))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Top Selling Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.product_name}</td>
              <td>{item.total_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;