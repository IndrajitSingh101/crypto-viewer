import React, {FC, useEffect, useState} from "react";
import {Button, Jumbotron, InputGroup, FormControl, Spinner, Alert, Container, Row, Col, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const CryptoViewer: FC<{}> =()=>{
    const API_GATEWAY_URL=process.env.REACT_APP_FETCH_CRYPTO;
    const [cryptoName,setCryptoName]=useState<string>("");
    const [loading,setLoading]=useState<boolean>(false);
    const [data,setData]:[ICrypto[], (posts: ICrypto[]) => void]=useState<ICrypto[]>([]);
    const [error,setError]=useState<string>("");
    const handleText =(e:any)=>{
        setCryptoName((e.target.value).toUpperCase());
    }

    useEffect(()=>{
        setLoading(false);
    },[]);
    const getCryptoInfo=async ()=>{
        setLoading(true);
        await axios.get<ICrypto[]>(`${API_GATEWAY_URL}${cryptoName}`,{
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res)=>{
                setData(res.data);
                setLoading(false);
            })
            .catch(error=>{
                setError(error.message);
                setLoading(false);
            })
    }

    return(
        <Jumbotron>
        <div>
            <InputGroup>
                <FormControl
                    placeholder="Crypto short name (ex: ETH , BTC)"
                    aria-label="Crypto"
                    aria-describedby="basic-addon2"
                    onChange={handleText}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={getCryptoInfo}>Fetch</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
            <div>
                {loading?
                    (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ):error?
                        (
                            <Alert variant="warning">
                                <Alert.Heading>Oh! Something went wrong</Alert.Heading>
                                <p>
                                    Error:{error}
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Either the backend is down or you have not put correct value.
                                </p>
                            </Alert>
                        ):(
                            <Jumbotron>
                                {data.length===0?
                                    (<Alert variant="warning">
                                        <Alert.Heading>Oh! Something went wrong</Alert.Heading>
                                        <p>
                                            Error:{error}
                                        </p>
                                        <hr />
                                        <p className="mb-0">
                                            Either you typed something wrong or the index does not exist.
                                        </p>
                                    </Alert>):
                                    data.map((cryptoInfo)=>(
                                <Container>
                                    <Row>
                                        <Col xs={6} md={4}>
                                            <Image src={cryptoInfo.logo_url} rounded  />
                                        </Col>
                                        <Col>
                                            <Row>
                                            <InputGroup>
                                                <InputGroup.Append>
                                                    <InputGroup.Text><b>{cryptoInfo.name}</b></InputGroup.Text>
                                                    <InputGroup.Text>${cryptoInfo.price}</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                                    ))}
                            </Jumbotron>
                        )
                }
            </div>
        </Jumbotron>
    )
};

export default CryptoViewer;