import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../components/styles.module.css'

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [fats, setFats] = useState(0);
    const [proteins, setProteins] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);

    const getProduct = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        axios.get(`https://localhost:7172/api/Product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log('response', response);
                setName(response.data.productName);
                setCalories(response.data.calories);
                setFats(response.data.fats);
                setProteins(response.data.proteins);
                setCarbohydrates(response.data.carbohydrates);
            })
            .catch(err => {
                console.log('err', err)
            })
    }
    
    const editProductHandler = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (true) {
            axios.put(`https://localhost:7172/api/Product/${id}`,
                {
                    productId: id,
                    productName: name,
                    calories: calories,
                    fats: fats,
                    proteins: proteins,
                    carbohydrates: carbohydrates
                }, { headers: { Authorization: `Bearer ${token}` } }
            )
                .then(navigate('/', { replace: true }))
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    }, [])
  return (
    <div>
        <h1>Edit product</h1>
        <hr />
        <form style={{ width: '30rem', margin: 'auto' }}>
            <div className="mb-3 d-flex">
                <label className="form-label m-2">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3 d-flex">
                <label className="form-label m-2">Calories:</label>
                <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={calories}
                    onChange={e => setCalories(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3 d-flex">
                <label className="form-label m-2">Fats:</label>
                <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={fats}
                    onChange={e => setFats(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3 d-flex">
                <label className="form-label m-2">Proteins:</label>
                <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={proteins}
                    onChange={e => setProteins(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3 d-flex">
                <label className="form-label m-2">Carbohydrates:</label>
                <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={carbohydrates}
                    onChange={e => setCarbohydrates(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className={`btn ${styles.customBtn}`}
                onClick={editProductHandler}
            >Change</button>
        </form>
    </div>
  )
}
