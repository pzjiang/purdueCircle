import axios from 'axios';


const updatePassword = payload => axios.put(`api/v1/password/update`, payload);
const updateEmail = payload => axios.put(`api/v1/email/update`, payload);


const registrationApi = {
    updatePassword,
    updateEmail
};

export default registrationApi;


