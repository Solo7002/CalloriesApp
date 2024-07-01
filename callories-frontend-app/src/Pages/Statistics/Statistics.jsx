import React, { useEffect, useState } from 'react'
import Dish from '../../components/Dish';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Product from '../../components/Product';
import styles from '../../components/styles.module.css';


export default function Statistics() {
    const colors = {
      darkGreen: '#1A4301',
      mediumGreen: '#245501',
      lightGreen: '#4C7F22',
      limeGreen: '#73A942',
      lightLimeGreen: '#AAD576',
      white: '#FFFFFF',
    };

    const cardStyle = {
      backgroundColor: colors.lightLimeGreen,
      borderColor: colors.mediumGreen,
      color: colors.darkGreen,
      marginBottom: '20px',
    };

    const tableStyle = {
      backgroundColor: colors.lightLimeGreen,
      borderColor: colors.mediumGreen,
    };

    const tableHeaderStyle = {
      backgroundColor: colors.mediumGreen,
      color: colors.white,
    };

    const tableCellStyle = {
      backgroundColor: colors.white,
      color: colors.darkGreen,
    };
    

    return (
        <div className='Statistics-page'>
        <Container fluid style={{ backgroundColor: colors.white, padding: '20px' }}>
          <Row>
            <Col md={4}>
              <Card style={{ ...cardStyle, height: '100%' }}>
                <Card.Body>
                  <Card.Title>User Information</Card.Title>
                  <p><strong>Login:</strong> user123</p>
                  <p><strong>Email:</strong> user@example.com</p>
                  <p><strong>Weight:</strong> 70 kg</p>
                  <p><strong>Gender:</strong> Male</p>
                  <p><strong>Goal:</strong> Maintain Weight</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card style={{ ...cardStyle, height: '100%' }}>
                <Card.Body>
                  <Card.Title>Daily Caloric Intake Recommendation</Card.Title>
                  <p>Based on your goal, you should consume <strong>2200</strong> calories per day.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
            <br />
          <Row>
            <Col md={6}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>Today's Nutrient Intake</Card.Title>
                  <Row>
                    <Col>
                      <p>Proteins: <strong>30g</strong></p>
                    </Col>
                    <Col>
                      <p>Fats: <strong>4g</strong></p>
                    </Col>
                    <Col>
                      <p>Carbs: <strong>0g</strong></p>
                    </Col>
                    <Col>
                      <p>Calories: <strong>160</strong></p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>Consumed Products Today</Card.Title>
                  <Table striped bordered hover style={tableStyle} className='table'>
                    <thead style={tableHeaderStyle}>
                      <tr>
                        <th>Name</th>
                        <th>Proteins (g)</th>
                        <th>Fats (g)</th>
                        <th>Carbs (g)</th>
                        <th>Calories</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={tableCellStyle}>
                        <td>Chicken Breast</td>
                        <td>30</td>
                        <td>4</td>
                        <td>0</td>
                        <td>160</td>
                        <td>
                          <Button variant="danger" size="sm" style={{ marginRight: '5px' }}>Remove</Button>
                          <Button variant="success" size="sm">Add</Button>
                        </td>
                      </tr>
                      {/* Здесь будет динамическое добавление других продуктов */}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>User Summary</Card.Title>
                  <p>Today's summary for user activities and goals will be displayed here.</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>Additional Notes</Card.Title>
                  <p>Any additional notes or tips can be shown in this section.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        </div>
    )
}
