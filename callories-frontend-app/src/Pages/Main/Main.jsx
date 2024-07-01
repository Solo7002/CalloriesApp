import React, { useEffect, useState } from 'react'
import Dish from '../../components/Dish';
import axios from 'axios';
import { ButtonGroup, Form, ToggleButton } from 'react-bootstrap';
import Product from '../../components/Product';
import styles from '../../components/styles.module.css';

import "./Main.css";

export default function Main() {
    const [dishes, setDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [radioValue, setRadioValue] = useState("Dish");

    const [seach, setSeach] = useState("");

    const getDishesHandler = () => {
        axios.get('https://localhost:7172/api/Dish')
            .then(response => {
                console.log('response', response)
                const dArr = response.data;
                console.log('dishes', dArr)
                setDishes(dArr);
                setFilteredDishes(dArr);
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    const getProductsHandler = () => {
        axios.get('https://localhost:7172/api/Product')
            .then(response => {
                console.log('response', response)
                const dArr = response.data;
                console.log('products', dArr)
                setProducts(dArr);
                setFilteredProducts(dArr);
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    const deleteDishHandler = (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        axios.delete(`https://localhost:7172/api/Dish/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => { getDishesHandler() })
            .catch(err => {
                console.log('err', err)
            });
    }

    const deleteProductHandler = (id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        axios.delete(`https://localhost:7172/api/Product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => { getProductsHandler() })
            .catch(err => {
                console.log('err', err)
            });
    }

    useEffect(() => {
        getDishesHandler();
        getProductsHandler();
    }, []);

    useEffect(() => {
        if (radioValue === "Dish"){
            setFilteredDishes(seach.trim() === ''? dishes : dishes.filter(d => d.name.startsWith(seach)));
        }
        else {
            setFilteredProducts(seach.trim() === ''? products : products.filter(p => p.productName.startsWith(seach)));
        }
    }, [seach]);

    return (
        <div className='Main-page'>
            <h1>{radioValue} list</h1>
            <hr />
            <div style={{ width: '25rem', margin: 'auto', display: 'flex' }}>
                <Form.Control type="text" style={{marginRight: '1rem'}} placeholder="Search..." onChange={(event) => setSeach(event.target.value)}/>
                <ButtonGroup className={styles.btnGroupCustom}>
                    <ToggleButton
                        key={1}
                        id={`radio-1`}
                        type="radio"
                        name="radio"
                        value="Dish"
                        checked={radioValue === "Dish"}
                        className={`${radioValue === "Dish" ? `${styles.active}` : `${styles.btnToggleCustom}`}`}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        style={{backgroundColor: "darkgreen"}}
                    >
                        Dish
                    </ToggleButton>
                    <ToggleButton
                        key={2}
                        id={`radio-2`}
                        type="radio"
                        name="radio"
                        value="Product"
                        checked={radioValue === "Product"}
                        className={`${styles.btnToggleCustom} ${radioValue === 'Product' ? `${styles.active}` : `${styles.btnToggleCustom}`}`}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Product
                    </ToggleButton>
                </ButtonGroup>
            </div>
            <div className={styles.cardContainer}>
                {
                radioValue === "Dish"
                    ?
                    (filteredDishes.length > 0
                        ?
                        filteredDishes.map(dish => {
                            return (<Dish
                                key={dish.dishId}
                                id={dish.dishId}
                                name={dish.name}
                                weight={dish.weight}
                                onDeleteClick={() => deleteDishHandler(dish.dishId)}
                            />)
                        })
                        :
                        <p>no dishes</p>)

                    :
                    (filteredProducts.length > 0
                        ?
                        filteredProducts.map(dish => {
                            return (<Product
                                key={dish.productId}
                                id={dish.productId}
                                productName={dish.productName}
                                calories={dish.calories}
                                fats={dish.fats}
                                proteins={dish.proteins}
                                carbohydrates={dish.carbohydrates}
                                onDeleteClick={() => deleteProductHandler(dish.productId)}
                            />)
                        })
                        :
                        <p>no products</p>)
                }
            </div>
        </div>
    )
}
