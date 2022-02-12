import axios from 'axios';


const updatePassword = payload => axios.put(`api/v1/password/update`, payload);


const registrationApi = {
    updatePassword,
};

export default registrationApi;


