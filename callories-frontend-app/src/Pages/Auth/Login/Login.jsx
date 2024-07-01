import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import styles from '../../../components/styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://localhost:7172/api/Auth/login`,
            {
                login,
                password
            })
            .then(response => {
                console.log('response', response);
                localStorage.setItem('user', `{"token": "${response.data.token}"}`);
                navigate('/', { replace: true });
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
                            <Card.Title className="text-center">Login</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
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

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={`w-100 mt-3 ${styles.customBtn}`}>
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
