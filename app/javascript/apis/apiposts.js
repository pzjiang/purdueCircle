import axios from 'axios';

const getPost = () => axios.get(`api/v1/posts/`);

const showPost = payload => axios.get(`api/v1/posts/${payload.id}/`);

const createPost = payload => axios.post(`api/v1/createPost/`, payload);

const editPost = payload => axios.put(`api/v1/updatePost/${payload.id}`, payload);

const deletePost = payload => axios.delete(`api/v1/posts/${payload.id}`);

const postsApi = {
    getPost,
    createPost,
    editPost,
    showPost,
    deletePost,

};

export default postsApi;