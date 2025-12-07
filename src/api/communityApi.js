import API from "./axios";

// Posts
export const getAllPosts = async () => { const res = await API.get("/community"); return res.data; };
export const getPostById = async (id) => { const res = await API.get(`/community/${id}`); return res.data; };
export const createPost = async (postData) => { const res = await API.post("/community", postData); return res.data; };
export const updatePost = async (id, updateData) => { const res = await API.patch(`/community/${id}`, updateData); return res.data; };
export const deletePost = async (id) => { const res = await API.delete(`/community/${id}`); return res.data; };
export const addCommentToPost = async (postId, comment) => { const res = await API.post(`/community/${postId}/comment`, { comment }); return res.data; };
export const likePost = async (postId) => { const res = await API.post(`/community/${postId}/like`); return res.data; };

// Messages
export const sendMessage = async (receiverId, content) => { const res = await API.post("/community/message", { receiverId, content }); return res.data; };
export const getMessages = async (otherUserId) => { const res = await API.get(`/community/messages/${otherUserId}`); return res.data; };

// Points
export const getPostPoints = async (postId) => { const res = await API.get(`/community/${postId}/points`); return res.data; };
export const getUserPoints = async (userId) => { const res = await API.get(`/community/user/${userId}/points`); return res.data.points; };
