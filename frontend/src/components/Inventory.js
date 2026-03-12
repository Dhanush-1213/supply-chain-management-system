import React, { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setInventory(response.data);
        } else if (Array.isArray(response.data.data)) {
          setInventory(response.data.data);
        } else {
          setInventory([]);
        }
      })
      .catch((error) => {
        console.error("Inventory fetch error:", error);
        setInventory([]);
      });
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <tr key={item.inventory_id}>
                <td>{item.inventory_id}</td>
                <td>{item.product_name}</td>
                <td>{item.warehouse_name}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.last_updated).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No inventory found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;