import axios from 'axios';

const addComment = payload => axios.put(`api/v1/comments`, payload);

const deleteComment = payload => axios.delete(`api/v1/comments/${payload.id}`);

const showComments = payload => axios.get(`api/v1/comments/${payload.post_id}`);


const commentsApi = {
    addComment,
    deleteComment,
    showComments,

};

export default commentsApi;