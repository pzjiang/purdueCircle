import axios from 'axios';


const login = payload => axios.post(`api/v1/login`, payload);

const logout = () => axios.delete(`api/v1/logout`);

const signup = payload => axios.post(`api/v1/users`, payload);

const deleteaccount = () => axios.delete(`api/v1/users`);



const authenticationApi = {
    login,
    logout,
    signup,
    deleteaccount,
};

export default authenticationApi;