import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddProductModal = ({ show, handleClose, handleSave, allproducts }) => {
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState(-1);
    const [proteins, setProteins] = useState(0);
    const [fats, setFats] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [calories, setCalories] = useState(0);

    const handleAddProduct = () => {
        if (productName.trim() === '') return;
        const newProduct = {
            id: productId==-1?undefined:productId,
            name: productName,
            proteins,
            fats,
            carbs,
            calories
        };
        handleSave(newProduct);
        handleClose();
    };

    const changeProductNameHandler = (event) => {
        setProductName(event.target.value);

        let knownProduct = allproducts.find(p => p.productName == event.target.value);
        if (knownProduct){
            setProductId(knownProduct.productId);
            setProteins(knownProduct.proteins);
            setCarbs(knownProduct.carbohydrates);
            setFats(knownProduct.fats);
            setCalories(knownProduct.calories);
        }
        else {
            setProductId(-1);
            setProteins(0);
            setCarbs(0);
            setFats(0);
            setCalories(0);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Додати продукт</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="productName">
                        <Form.Label>Назва продукту</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Введіть назву продукту" 
                            value={productName}
                            onChange={changeProductNameHandler}
                        />
                    </Form.Group>
                    <Row className="mt-3">
                        <Col>
                            <Form.Group controlId="proteins">
                                <Form.Label>Білки (г)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="0" 
                                    value={proteins}
                                    onChange={(e) => setProteins(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="fats">
                                <Form.Label>Жири (г)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="0" 
                                    value={fats}
                                    onChange={(e) => setFats(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Group controlId="carbs">
                                <Form.Label>Вуглеводи (г)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="0" 
                                    value={carbs}
                                    onChange={(e) => setCarbs(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="calories">
                                <Form.Label>Калорії (ккал)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="0" 
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Скасувати
                </Button>
                <Button variant="primary" onClick={handleAddProduct}>
                    Додати продукт
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddProductModal;