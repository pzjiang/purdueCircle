import axios from 'axios';

const editprofile = payload => axios.put(`/api/v1/editprofile/`, payload);
const getprofile = payload => axios.get(`api/v1/profiles/${payload.user_id}`);


const profileApi = {
    editprofile,
    getprofile,

};

export default profileApi;