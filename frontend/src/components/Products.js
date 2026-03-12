import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data.data || response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.supplier_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;