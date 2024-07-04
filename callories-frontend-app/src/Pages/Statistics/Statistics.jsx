import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user_profile_image from '../../images/User_Profile.png';
import AddProductModal from '../../components/AddProductModal/AddProductModal.jsx';

import "./Statistics.css";

export default function Statistics() {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')).token);
    const [CurrentUser, setCurrentUser] = useState({}); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCurrendDate, setIsCurrentDate] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [mealHistories, setMealHistories] = useState([]);
    const [productsForCurrentDate, setProductsForCurrentDate] = useState([]);

    const [RecomendedCalories, setRecomendedCalories] = useState(0);
    const [NowCalories, setNowCalories] = useState(0);
    const [NowProteins, setNowProteins] = useState(0);
    const [NowFats, setNowFats] = useState(0);
    const [NowCarbs, setNowCarbs] = useState(0);

    const [pageReload, setPageReload] = useState(false);

    useEffect(() => {
        const decoded = jwtDecode(token);
        axios.get(`https://localhost:7172/api/User/byLogin/${decoded.unique_name}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => { 
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
                loadProductsByMealHistories(res.data.userId, selectedDate);
             })
            .catch(err => {
                console.log('err', err)
            });

        axios.get(`https://localhost:7172/api/Product`, { headers: {Authorization: `Bearer ${token}` } })
        .then(res => {
            setAllProducts(res.data);
         })
        .catch(err => {
            console.log('err', err)
        });
    }, [token, pageReload]);

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

    const saveProductHandler = (newProduct) => {
        if (!newProduct.id){
            axios.post(`https://localhost:7172/api/Product`, {
                productName: newProduct.name,
                calories: newProduct.calories,
                fats: newProduct.fats,
                proteins: newProduct.proteins,
                carbohydrates: newProduct.carbs,
            } ,{ headers: {Authorization: `Bearer ${token} ` } })
            .then(res => {
                postRequestToMealHistoriesWithProdId(res.data.productId);
                setPageReload(!pageReload);
             })
            .catch(err => {
                console.log('err', err)
            });
        }
        else {
            postRequestToMealHistoriesWithProdId(newProduct.id);
            setPageReload(!pageReload);
        }
    }

    const postRequestToMealHistoriesWithProdId = (prod_id) => {
        axios.post(`https://localhost:7172/api/MealHistory`, {
            productId: prod_id,
            userId: CurrentUser.userId
        } ,{ headers: {Authorization: `Bearer ${token} ` } })
        .then(res => {
            console.log("mealHistory post responce: ", res.data);
         })
        .catch(err => {
            console.log('err', err)
        });
    }

    const loadProductsByMealHistories = (user_id, sel_date) => {
        let temp_products_arr = [];
        let temp_calories = 0;
        let temp_carbs = 0;
        let temp_fats = 0;
        let temp_proteins = 0;
        axios.get(`https://localhost:7172/api/MealHistory/byUserId/${user_id}`, { headers: {Authorization: `Bearer ${token} ` } })
        .then(res => {
            console.log("mealHistories: ", res.data);
            console.log("-------------------------------");

            const promises = res.data.map((mh) => {
                let mhDate = new Date(mh.mealDateTime);

                if (mhDate.getFullYear() === sel_date.getFullYear() && 
                    mhDate.getMonth() === sel_date.getMonth() && 
                    mhDate.getDate() === sel_date.getDate()) {
                    
                    return axios.get(`https://localhost:7172/api/Product/${mh.productId}`, { 
                        headers: { Authorization: `Bearer ${token}` } 
                    })
                    .then(res => {
                        temp_products_arr.push({
                            mealHistoryId: mh.mealHistoryId,
                            productId: mh.productId,
                            productName: mh.productName,
                            calories: res.data.calories,
                            carbohydrates: res.data.carbohydrates,
                            fats: res.data.fats,
                            proteins: res.data.proteins
                        });
                        temp_calories += res.data.calories;
                        temp_carbs += res.data.carbohydrates;
                        temp_fats += res.data.fats;
                        temp_proteins += res.data.proteins;
                    
                        console.log("res.data.calories: ", temp_calories + res.data.calories);
                    })
                    .catch(err => {
                        console.log('err', err);
                    });
                }
            });

            Promise.all(promises).then(() => {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("temp_calories: ", temp_calories);
            
                setProductsForCurrentDate(temp_products_arr);
                setNowCalories(Math.round(temp_calories * 100) / 100);
                setNowCarbs(Math.round(temp_carbs * 100) / 100);
                setNowFats(Math.round(temp_fats * 100) / 100);
                setNowProteins(Math.round(temp_proteins * 100) / 100);
            });
         })
        .catch(err => {
            console.log('err', err)
        });
    }

    const changeDateHandler = (date) => {
        setSelectedDate(date);
        loadProductsByMealHistories(CurrentUser.userId, date);
        let todayDate = new Date();
        if (todayDate.getFullYear() == date.getFullYear() && todayDate.getMonth() == date.getMonth() && todayDate.getDate() == date.getDate()){
            setIsCurrentDate(true);
        }
        else{
            setIsCurrentDate(false);
        }
    }

    const deleteProductHandler = (mealHistoryId) => {
        console.log("mealHistoryId: ", mealHistoryId);
        axios.delete(`https://localhost:7172/api/MealHistory/${mealHistoryId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            console.log("del responce: ", res.data);

            loadProductsByMealHistories(CurrentUser.userId, selectedDate);
        })
        .catch(err => {
            console.log("err: ", err);
        });
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
                                  onChange={changeDateHandler}
                                  maxDate={new Date()}
                                  inline/>
                            </div>
                          </Col>
                      </Row>
                      <Row>
                          <Col md={12}>
                              <Card style={{ borderColor: '#AAD576' }} className="mb-3">
                                  <Card.Body>
                                      <Card.Title>Спожиті поживні речовини <small style={{display: "inline"}}><b>{isCurrendDate?"сьогодні":`${String(selectedDate.getDate()).padStart(2, '0')}.${String(selectedDate.getMonth() + 1).padStart(2, '0')}.${selectedDate.getFullYear()}`}</b></small></Card.Title>
                                      <Row className='mt-3'>
                                          <Col><p>Білки: <b>{NowProteins}</b> г</p></Col>
                                          <Col><p>Жири: <b>{NowFats}</b> г</p></Col>
                                          <Col><p>Вуглеводи: <b>{NowCarbs}</b> г</p></Col>
                                          <Col><p>Калорії: <b>{NowCalories}</b> ккал</p></Col>
                                      </Row>
                                  </Card.Body>
                              </Card>
                              <Card style={{ borderColor: '#AAD576' }}>
                                  <Card.Body>
                                      <Card.Title>Спожиті продукти {isCurrendDate?"cьогодні":``}</Card.Title>
                                        <AddProductModal 
                                            show={showModal} 
                                            handleClose={() => setShowModal(false)} 
                                            handleSave={saveProductHandler} 
                                            allproducts={allProducts}
                                        />
                                      {
                                        productsForCurrentDate.length == 0 
                                        ?
                                        <div className='m-3'><p><b>{isCurrendDate?"Сьогодні":`${String(selectedDate.getDate()).padStart(2, '0')}.${String(selectedDate.getMonth() + 1).padStart(2, '0')}.${selectedDate.getFullYear()}`}</b> Ви не додавали з'їдені вами продукти. {isCurrendDate?<span className='text-primary' style={{cursor: "pointer"}} onClick={() => setShowModal(true)}> Натисніть сюди що б додати новий продукт</span>:<span></span>}</p></div>
                                        :
                                        <div>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Назва</th>
                                                        <th>Білки (г)</th>
                                                        <th>Жири (г)</th>
                                                        <th>Вуглеводи (г)</th>
                                                        <th>Калорії</th>
                                                        {
                                                            isCurrendDate &&
                                                            <th>Дії</th>
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    productsForCurrentDate.map((p, index) => (
                                                        <tr key={index}>
                                                            <td>{p.productName}</td>
                                                            <td>{p.proteins}</td>
                                                            <td>{p.fats}</td>
                                                            <td>{p.carbohydrates}</td>
                                                            <td>{p.calories}</td>
                                                            {
                                                                isCurrendDate && 
                                                                <td>
                                                                    <Button variant="danger" size="sm" onClick={() => deleteProductHandler(p.mealHistoryId)}>Видалити</Button>
                                                                </td>
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                                    
                                                </tbody>
                                            </Table>
                                            {
                                                isCurrendDate &&
                                                <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>Додати продукт</Button>
                                            }
                                        </div> 
                                      }
                                  </Card.Body>
                              </Card>
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </Container>
        </div>
    )
}
