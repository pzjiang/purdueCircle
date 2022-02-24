import axios from 'axios';

const getPost = payload => axios.get(`api/v1/posts/`, payload);

const showPost = payload => axios.get(`api/v1/posts/${payload.id}/`);

const createPost = payload => axios.post(`api/v1/posts/`, payload);

const editPost = payload => axios.put(`api/v1/posts/${payload.id}`, payload);

const deletePost = payload => axios.delete(`api/v1/posts/${payload.id}`);

const incrementLike = payload => axios.put(`api/v1/likes/`, payload);

const likesPost = payload => axios.get(`api/v1/likespost/${payload.user_id}/${payload.post_id}/`);

const postsApi = {
    getPost,
    createPost,
    editPost,
    showPost,
    deletePost,
    incrementLike,
    likesPost,

};

export default postsApi;