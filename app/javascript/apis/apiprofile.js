import axios from 'axios';

const editbio = payload => axios.post('/api/v1/profiles');



const profileApi = {
    editbio,

};

export default profileApi;