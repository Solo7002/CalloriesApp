import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export default function Product(props) {
  return (
        <div className="card" style={{ width: '15rem', margin: '1rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.productName}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.calories} calories</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.fats} fats</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.proteins} proteins</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">{props.carbohydrates} carbohydrates</h6>
                <Link to={`/edit-product/${props.id}`} className={`btn ${styles.customBtn}`}>Edit</Link>
                <Button
                    className={`btn ${styles.customBtn} ${styles.customBtnDelete}`}
                    onClick={props.onDeleteClick}
                >Delete</Button>
            </div>
        </div>
  )
}
