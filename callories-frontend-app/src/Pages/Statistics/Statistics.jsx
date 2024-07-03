import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user_profile_image from '../../images/User_Profile.png';

import "./Statistics.css";

export default function Statistics() {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')).token);
    const [CurrentUser, setCurrentUser] = useState({}); 
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [RecomendedCalories, setRecomendedCalories] = useState(0);
    const [NowCalories, setNowCalories] = useState(1800);

    useEffect(() => {
        const decoded = jwtDecode(token);
        axios.get(`https://localhost:7172/api/User/byLogin/${decoded.unique_name}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => { 
                console.log("res: ", res.data);
                setCurrentUser(res.data);

                let bmr = (res.data.weight * (res.data.isMan?24:22));
                let tdee = bmr * 1.5;

                switch (res.data.aim){
                    case "1": // Набрати вагу
                        setRecomendedCalories(tdee + 500);
                        break;
                    case "2": // Втримати вагу
                        setRecomendedCalories(tdee);
                        break;
                    case "3": // Скинути вагу
                        setRecomendedCalories(tdee - 500);
                        break;
                    default: // Втримати вагу
                        setRecomendedCalories(tdee);   
                        break;
                }
             })
            .catch(err => {
                console.log('err', err)
            });
    }, [token]);

    const getAim = () => {
        switch (CurrentUser.aim){
            case "1":
                return "Набрати вагу";
            case "2":
                return "Втримати вагу";
            case "3":
                return "Скинути вагу";
            default:
                return "Втримати вагу";                
        }
    }

    return (
        <div className='Statistics-page'>
          <Container fluid style={{ backgroundColor: '#FFFFFF' }}>
              <Row className="p-4">
                  <Col md={3}>
                      <Card style={{ borderColor: '#AAD576' }}>
                          <Card.Body>
                              <div className="mb-3">
                                <div className="rounded-circle" style={{ width: '100px',height: '100px', position: "relative", display: "flex", justifyContent: "center", margin: "auto", backgroundColor: "#4C7F22" }}>
                                    <img src={user_profile_image} style={{position: "absolute", width: "101%", height: "100%", top: "0", left: "0"}}/>
                                </div>
                              </div>
                              <Form.Group className="mb-3">
                                  <Form.Label>Логін:</Form.Label>
                                  <Form.Control type="text" placeholder={CurrentUser.login} disabled />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                  <Form.Label>Електронна пошта:</Form.Label>
                                  <Form.Control type="text" placeholder={CurrentUser.email} disabled />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                  <Form.Label>Вага:</Form.Label>
                                  <Form.Control type="text" placeholder={CurrentUser.weight + " кг"} disabled />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                  <Form.Label>Стать:</Form.Label>
                                  <Form.Control type="text" placeholder={CurrentUser.isMan?"Чоловік":"Жінка"} disabled />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                  <Form.Label>Мета:</Form.Label>
                                  <Form.Control type="text" placeholder={getAim()} disabled />
                              </Form.Group>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col md={9}>
                      <Row>
                          <Col md={8}>
                              <Card style={{ borderColor: '#AAD576' }} className="mb-3">
                                  <Card.Body>
                                      <Card.Title>Рекомендація щоденного споживання калорій</Card.Title>
                                      <p>З огляду на те що Ви хочете <b>{getAim()}</b>, для Вас оптимальним рішенням буде: <b>{RecomendedCalories} ккал</b> на день.</p>
                                  </Card.Body>
                              </Card>
                              <Card style={{ borderColor: '#AAD576' }} className="mb-3">
                                  <Card.Body>
                                      <Card.Title>Підсумок</Card.Title>
                                      <p>Ви спожили <b className={(NowCalories < (RecomendedCalories - 70))?"text-primary":((NowCalories > (RecomendedCalories + 70))?"text-danger":"text-success")}>{NowCalories} ккал</b> із <b>{RecomendedCalories}</b> необхідних. 
                                      {
                                        (NowCalories < (RecomendedCalories - 70))?
                                        <div> Вам слід вжити <b>більше</b> калорій для дотримання Вашої мети.</div>:<div></div>
                                      }
                                      {
                                        (NowCalories >= (RecomendedCalories - 70) && NowCalories <= (RecomendedCalories + 70))?
                                        <div> Ви вжили <b className='text-success'>оптимальну</b> кількість калорій за день, <b>час зупиниться</b>.</div>:<div></div>
                                      }
                                      {
                                        (NowCalories > (RecomendedCalories + 70))?
                                        <div> Ви <b className='text-danger'>перевищили</b> норму вживання калорій за день, це може призвести до <b className='text-danger'>негативних</b> наслідків.</div>:<div></div>
                                      }
                                      </p>
                                  </Card.Body>
                              </Card>
                          </Col>
                          <Col md={4} className="text-center">
                            <div className="d-flex justify-content-around mb-3">
                                <DatePicker
                                  selected={selectedDate}
                                  onChange={date => setSelectedDate(date)}
                                  maxDate={new Date()}
                                  inline/>
                            </div>
                          </Col>
                      </Row>
                      <Row>
                          <Col md={12}>
                              <Card style={{ borderColor: '#AAD576' }} className="mb-3">
                                  <Card.Body>
                                      <Card.Title>Споживання поживних речовин сьогодні</Card.Title>
                                      <Row>
                                          <Col><p>Білки: ...</p></Col>
                                          <Col><p>Жири: ...</p></Col>
                                          <Col><p>Вуглеводи: ...</p></Col>
                                          <Col><p>Калорії: ...</p></Col>
                                      </Row>
                                  </Card.Body>
                              </Card>
                              <Card style={{ borderColor: '#AAD576' }}>
                                  <Card.Body>
                                      <Card.Title>Спожиті продукти сьогодні</Card.Title>
                                      <Table striped bordered hover>
                                          <thead>
                                              <tr>
                                                  <th>Назва</th>
                                                  <th>Білки (г)</th>
                                                  <th>Жири (г)</th>
                                                  <th>Вуглеводи (г)</th>
                                                  <th>Калорії</th>
                                                  <th>Дії</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              <tr>
                                                  <td>Куряча грудка</td>
                                                  <td>10</td>
                                                  <td>4</td>
                                                  <td>0</td>
                                                  <td>160</td>
                                                  <td>
                                                      <Button variant="danger" size="sm">Видалити</Button>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </Table>
                                      <Button variant="success" className="mb-3">Додати продукт</Button>
                                  </Card.Body>
                              </Card>
                          </Col>
                      </Row>
                  </Col>
              </Row>
              <Row className="bg-dark text-white p-3">
                  <Col className="d-flex justify-content-around">
                      <Button variant="link" className="text-white">Facebook</Button>
                      <Button variant="link" className="text-white">Instagram</Button>
                      <Button variant="link" className="text-white">Twitter</Button>
                  </Col>
              </Row>
          </Container>
        </div>
    )
}
