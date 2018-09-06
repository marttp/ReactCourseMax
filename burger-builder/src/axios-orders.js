import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://my-burger-cb51d.firebaseio.com'
});

export default instance;