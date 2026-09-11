import api from "@/lib/axios";

export const createPaymentOrder = async (orderDetails) => {
    const response = await api.post("/create-order", orderDetails);
    return response.data?.data;
};

export const verifyPayment = async (paymentDetails) => {
    const response = await api.post("/verify-payment", paymentDetails);
    return response.data?.data;
};

export const getUserOrders = async (userId) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data?.data?.orders ?? [];
};

export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data?.data?.order ?? null;
};