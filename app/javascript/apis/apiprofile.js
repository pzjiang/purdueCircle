import axios from 'axios';

const editprofile = payload => axios.post(`/api/v1/profiles`);
const getprofile = () => axios.get(`api/v1/profiles`);


const profileApi = {
    editprofile,

};

export default profileApi;