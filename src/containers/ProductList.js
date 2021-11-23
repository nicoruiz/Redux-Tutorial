import React, { useEffect } from "react";
import axios from "axios";
import ProductComponent from "./ProductComponent";
import { setProducts } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const ProductList = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const response = await axios
            .get('https://fakestoreapi.com/products')
            .catch((err) => {
                console.log("Error: ", err);
            });
        // Dispatch action with products
        dispatch(setProducts(response.data));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(products);

    return (
        <div className="ui grid container">
            {products.length === 0
                ? <div>Loading...</div>
                : <ProductComponent />
            }
        </div>
    );
}

export default ProductList;