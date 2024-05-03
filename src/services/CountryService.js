import { useHttp } from "../hooks/http.hook";

const useCountryService = () => {
    const _apiBase = 'https://restcountries.com/v3.1/';
    const { loading, request, error, clearError } = useHttp();

    const getCountryList = async () => {
        const res = await request(`${_apiBase}all`);
        return res.map(_transformCountry);
    }

    const getCountryInfo = async (name) => {
        const res = await request(`${_apiBase}name/${name}`);
        return _transformCountryInfo(res[0]);
    }

    const _transformCountry = (country) => {
        return {
            name: country.name.common,
            cioc: country.cioc
        }
    }

    const _transformCountryInfo = (country) => {
        return {
            name: country.name.common,
            capital: country.capital,
            flags: country.flags.png,
            region: country.region,
            maps: country.maps.googleMaps
        }
    }

    return { loading, error, getCountryList, getCountryInfo, clearError }
}

export default useCountryService;