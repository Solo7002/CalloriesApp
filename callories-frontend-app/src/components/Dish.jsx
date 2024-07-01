import { Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export default function Dish(props) {
    return (
      <div className={`card ${styles.card}`}>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.weight} g</h6>
          <Link to={`/edit-dish/${props.id}`} className={`btn ${styles.customBtn}`}>Edit</Link>
          <Button
            className={`btn ${styles.customBtn} ${styles.customBtnDelete}`}
            onClick={props.onDeleteClick}
          >
            Delete
          </Button>
        </div>
      </div>
    );
}
