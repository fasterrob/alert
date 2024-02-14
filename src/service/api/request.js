import { apiInstance } from "../axios";

export const getPosts = async () => await apiInstance.get("/post");

export const newPost = async (data) => await apiInstance.post("/newpost", data);

export const auth = async (user) => await apiInstance.post("/auth/", user);