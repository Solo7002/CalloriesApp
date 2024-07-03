import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import styles from '../../../components/styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Register() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [aim, setAim] = useState('1');
    const [weight, setWeight] = useState(30);
    const [isMan, setIsMan] = useState('true');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const formData = {
            login,
            password,
            confirmPassword: password,
            email,
            aim,
            weight,
            isMan: isMan === 'true'
        };

        console.log('Form Data:', formData);

        axios.post(`https://localhost:7172/api/Auth/register`, formData)
            .then(response => {
                console.log('response', response);
                navigate('/login', { replace: true });
            })
            .catch(err => {
                console.error('err', err);
                if (err.response) {
                    console.error('Server responded with:', err.response.data);
                }
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ paddingTop: '5rem' }}>
            <Row>
                <Col>
                    <Card style={{ minWidth: '400px' }}>
                        <Card.Body>
                            <Card.Title className="text-center">Реєстрація</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicLogin">
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
                                            placeholder="Пароль"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <InputGroup.Text onClick={togglePasswordVisibility}>
                                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Підтвердження паролю</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Введіть пароль повторно"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <InputGroup.Text onClick={toggleConfirmPasswordVisibility}>
                                            <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Електронна адреса</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Введіть електронну адресу"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAim">
                                    <Form.Label>Ціль</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={aim}
                                        onChange={(e) => setAim(e.target.value)}
                                        required
                                    >
                                        <option value="1">Набрати вагу</option>
                                        <option value="2">Втримати вагу</option>
                                        <option value="3">Скинути вагу</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formWeight">
                                    <Form.Label>Вага</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Введіть вашу вагу"
                                        value={weight}
                                        min={30}
                                        max={250}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formIsMan">
                                    <Form.Label>Стать</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={isMan}
                                        onChange={(e) => setIsMan(e.target.value)}
                                        required
                                    >
                                        <option value="true">Чоловік</option>
                                        <option value="false">Жінка</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={`w-100 mt-3 ${styles.customBtn}`}
                                >
                                    Зареєструватись
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
