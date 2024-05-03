import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import useCountryService from "../../services/CountryService";

import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import './countryList.scss';

const CountryList = () => {

    const [countryList, setCountryLIst] = useState(null);

    const { loading, error, clearError, getCountryList } = useCountryService();

    useEffect(() => {
        updateCountryList();
    }, []);

    const updateCountryList = () => {
        clearError();
        getCountryList()
            .then(onCountryListLoaded);
    }

    const onCountryListLoaded = (countryList) => {
        setCountryLIst(countryList);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !countryList) ? <View countryList={countryList} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
            <div className="author">Created by <a target="_blank" href="https://github.com/muhandis86/countries">&copy;Zaur Eskendarov</a></div>
        </>
    )
}

const View = ({ countryList }) => {

    return (
        <Card className="mx-auto mt-5 mb-4" style={{ width: '45rem' }}>
            <Card.Header className="fs-2" style={{ textAlign: 'center' }}>Countries of the World:</Card.Header>
            <ListGroup variant="flush">
                {countryList.map((country, i) => {
                    const countryName = country.name;
                    return (
                        <ListGroup.Item key={i}>
                            <div className="listItem">
                                <Link to={`/${countryName}`} className="link fs-4">{countryName}</Link>
                                <div>{country.cioc}</div>
                            </div>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Card>
    )
}

export default CountryList;