import React from "react";
import { render } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";

test("muestra productos", () => {
  const products = [{id:"1",name:"Producto",category:"A",price:100,stock:10,img:""}];
  const { getByText } = render(<ProductList products={products} addToCart={()=>{}} />);
  expect(getByText("Producto")).toBeTruthy();
});
