import axios from 'axios';

const getPost = () => axios.get("api/v1/posts/");

const createPost = payload => axios.post("api/v1/createPost/", payload);

const editPost = payload => axios.put("api/v1/updatePost/", payload);

const postsApi = {
    getPost,
    createPost,
    editPost,

};

export default postsApi;