import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import styles from '../../../components/styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://localhost:7172/api/Auth/login`, {
            login,
            password
        })
        .then(response => {
            console.log('response', response);
            localStorage.setItem('user', `{"token": "${response.data.token}"}`);
            navigate('/', { replace: true });
        })
        .catch(err => {
            console.log('err', err);
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '5rem' }}>
            <Row>
                <Col>
                    <Card style={{ minWidth: '400px' }}>
                        <Card.Body>
                            <Card.Title className="text-center">Вхід</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Логін</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введіть ваше ім'я"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Введіть ваш пароль"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <InputGroup.Text onClick={togglePasswordVisibility}>
                                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={`w-100 mt-3 ${styles.customBtn}`}
                                >
                                    Вхід
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
