import axios from 'axios';

const editprofile = payload => axios.put(`api/v1/editprofile/`, payload);
const getprofile = payload => axios.get(`api/v1/profiles/${payload.user_id}`);

const editavatar = payload => axios.put(`api/v1/editavatar/`, payload, {
    headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
    }
});


const profileApi = {
    editprofile,
    getprofile,
    editavatar,

};

export default profileApi;