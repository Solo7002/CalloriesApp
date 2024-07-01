import React, { useEffect, useState } from 'react'
import Dish from '../../components/Dish';
import axios from 'axios';
import { ButtonGroup, Form, ToggleButton } from 'react-bootstrap';
import Product from '../../components/Product';
import styles from '../../components/styles.module.css';


export default function Main() {
    const [dishes, setDishes] = useState([]);
    const [products, setProducts] = useState([]);
    const [radioValue, setRadioValue] = useState("Dish");

    const getDishesHandler = () => {
        axios.get('https://localhost:7172/api/Dish')
            .then(response => {
                console.log('response', response)
                const dArr = response.data;
                console.log('dishes', dArr)
                setDishes(dArr);
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    const getProductsHandler = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        axios.get('https://localhost:7172/api/Product', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log('response', response)
                const dArr = response.data;
                console.log('products', dArr)
                setProducts(dArr);
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
    }, [])

    return (
        <div>
            <h1>Dishes list</h1>
            <hr />
            <div style={{ width: '25rem', margin: 'auto', display: 'flex' }}>
                <Form.Control type="text" style={{marginRight: '1rem'}} placeholder="Search..." />
                <ButtonGroup className={styles.btnGroupCustom}>
                    <ToggleButton
                        key={1}
                        id={`radio-1`}
                        type="radio"
                        name="radio"
                        value="Dish"
                        checked={radioValue === "Dish"}
                        className={`${styles.btnToggleCustom} ${radioValue === 'Dish' ? 'active' : ''}`}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
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
                        className={`${styles.btnToggleCustom} ${radioValue === 'Product' ? 'active' : ''}`}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Product
                    </ToggleButton>
                </ButtonGroup>
            </div>
            <div style={{ display: 'flex', margin: '2rem' }}>
                {
                radioValue === "Dish"
                    ?
                    (dishes.length > 0
                        ?
                        dishes.map(dish => {
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
                    (products.length > 0
                        ?
                        products.map(dish => {
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
