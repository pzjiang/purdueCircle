import axios from 'axios';

const discoverUsers = (payload) => axios.get(`api/v1/usersearch/${payload.name}/${payload.number}`);

const findUser = (payload) => axios.get(`api/v1/userfind/${payload.name}`);

const userApi = {

    discoverUsers,
    findUser,

}

export default userApi;