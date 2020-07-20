import axios from "axios";

const apiGeocoding = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode',
});

export default apiGeocoding;