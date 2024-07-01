import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../components/styles.module.css'

export default function EditDish() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(1);
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    const getDish = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        axios.get(`https://localhost:7172/api/Dish/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log('response', response);
                setName(response.data.name);
                setWeight(response.data.weight);
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    useEffect(() => {
        getDish();
        // eslint-disable-next-line
    }, [])

    const validate = () => {
        let errors = {};
        if (!name) errors.name = "Name is required.";
        if (weight <= 0) errors.weight = "Weight must be greater than 0.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    const editProductHandler = (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (validate()) {
            axios.put(`https://localhost:7172/api/Dish/${id}`,
                {
                    dishId: id,
                    name: name,
                    weight: weight
                }, { headers: { Authorization: `Bearer ${token}` } }
            )
                .then(navigate('/', { replace: true }))
                .catch(err => console.log(err));
        }
    }
  return (
    <div>
        <h1>Edit dish</h1>
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
            {errors.name && <div className="text-danger">{errors.name}</div>}
            <div className="mb-3 d-flex">
                <label className="form-label m-2">Weight:</label>
                <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    required
                />
            </div>
            {errors.weight && <div className="text-danger">{errors.weight}</div>}
            <button
                type="submit"
                className={`btn ${styles.customBtn}`}
                onClick={editProductHandler}
            >Change</button>
        </form>
    </div>
  )
}
