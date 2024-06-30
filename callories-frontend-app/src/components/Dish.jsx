import { Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import './buttonstyles.css'

export default function Dish(props) {
    return (
        <div className="card" style={{ width: '15rem', margin: '1rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.weight} g</h6>
                <Link to={`/edit-dish/${props.id}`} className='btn hover-btn'>Edit</Link>
                <Button
                    className='hover-btn hover-btn-delete'
                    onClick={props.onDeleteClick}
                >Delete</Button>
            </div>
        </div>
    )
}
