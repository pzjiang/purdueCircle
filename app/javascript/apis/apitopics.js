import axios from 'axios';

//get posts by topic
const pullPosts = (payload) => axios.get(`api/v1/topicspull/${payload.number}/${payload.topic}`);

//get the topics that belong to a post
const pullTopics = (payload) => axios.get(`api/v1/topics/post/${payload.post_id}`);

//discover topics throug hsearching name

const discoverTopics = (payload) => axios.get(`api/v1/topicsdiscover/${payload.name}/${payload.number}`);

//follow a topic

const followTopic = (payload) => axios.post(`api/v1/followtopic`, payload);

//unfollow a topic 
const unfollowTopic = (payload) => axios.delete(`api/v1/followtopic/${payload.name}/${payload.id}`);

//get the topics a user follows

const followedTopics = (payload) => axios.get(`api/v1/followedtopics/${payload.id}`);

const followedTopicPosts = (payload) => axios.get(`api/v1/topicsfollowedposts/${payload.id}`);



const topicsApi = {
    pullPosts,
    pullTopics,
    discoverTopics,
    followTopic,
    unfollowTopic,
    followedTopics,
    followedTopicPosts,
};

export default topicsApi;