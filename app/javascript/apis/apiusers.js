import axios from 'axios';

const discoverUsers = (payload) => axios.get(`api/v1/usersearch/${payload.name}/${payload.number}`);

const findUser = (payload) => axios.get(`api/v1/userfind/${payload.name}`);

const getUser = (payload) => axios.get(`api/v1/users/${payload.user_id}`);

const userApi = {

    discoverUsers,
    findUser,
    getUser

}

export default userApi;