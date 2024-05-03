import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import useCountryService from "../../services/CountryService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import './countryPage.scss';

const CountryPage = () => {

    const { countryName } = useParams();
    const [country, setCountry] = useState(null);

    const { loading, error, clearError, getCountryInfo } = useCountryService();

    useEffect(() => {
        updateCountry();
    }, []);

    const updateCountry = () => {
        clearError();
        getCountryInfo(countryName)
            .then(onCountryInfoLoaded);
    }

    const onCountryInfoLoaded = (country) => {
        setCountry(country);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !country) ? <View country={country} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ country }) => {

    const { name, capital, flags, region, maps } = country;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (

        <Card className="mx-auto mt-5 mb-5" style={{ width: '30rem' }}>
            <Card.Img variant="top" src={flags} />
            <Card.Body>
                <Card.Title className="link fs-2">{name} - {region}</Card.Title>
                <Card.Text className="link fs-5">
                    {capital}
                </Card.Text>
                <div className='buttons'>
                    <Button onClick={goBack} variant="primary">Back to All</Button>
                    <Button variant="primary">
                        <Link to={maps} target="_blank" style={{ textDecoration: 'none', color: 'white' }}>Go to Maps</Link>
                    </Button>
                </div>
            </Card.Body>
        </Card >
    )
}

export default CountryPage;