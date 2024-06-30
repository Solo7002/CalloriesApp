import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/buttonstyles.css'

export default function EditDish() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(1);
    const { id } = useParams();

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
    
    const editProductHandler = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (true) {
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
            <button
                type="submit"
                className="btn hover-btn"
                onClick={editProductHandler}
            >Change</button>
        </form>
    </div>
  )
}
