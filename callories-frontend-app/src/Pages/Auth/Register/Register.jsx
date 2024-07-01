import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import styles from '../../../components/styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [aim, setAim] = useState('');
    const [weight, setWeight] = useState(30);
    const [isMan, setIsMan] = useState(true);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const formData = {
            login,
            password,
            "confirmPassword": password,
            email,
            aim,
            weight,
            isMan
        };
        axios.post(`https://localhost:7172/api/Auth/register`,formData)
            .then(response => {
                console.log('response', response);
                navigate('/login', { replace: true });
            })
            .catch(err => {
                console.log('err', err)
            })
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '5rem' }}>
            <Row>
                <Col>
                    <Card style={{minWidth: '400px'}}>
                        <Card.Body>
                            <Card.Title className="text-center">Register</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicLogin">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter login"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAim">
                                    <Form.Label>Aim</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter aim"
                                        value={aim}
                                        onChange={(e) => setAim(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formWeight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter weight"
                                        value={weight}
                                        min={30}
                                        max={250}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formIsMan">
                                    <Form.Check
                                        type="checkbox"
                                        label="Are you a man?"
                                        checked={isMan}
                                        onChange={(e) => setIsMan(e.target.checked)}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={`w-100 mt-3 ${styles.customBtn}`}>
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
