import axios from 'axios';


const updatePassword = payload => axios.put(`api/v1/password/update`, payload);
const update = payload => axios.put(`api/v1/account/update`, payload);


const registrationApi = {
    updatePassword,
    update
};

export default registrationApi;


