import api from "./api";

export const getLostItems = () => {
    return api.get("/");
};

export const addLostItem = (formData) => {
    return api.post("/lostItem", formData);
};

export const getMyLostItems = () => {
    return api.get("/my-lost-items");
};

export const deleteLostItem = (id) => {
    return api.delete(`/lostItem/${id}`);
};

export const updateLostItem = (id, lostItem) => {
    return api.put(`/lostItem/${id}`, lostItem);
};

