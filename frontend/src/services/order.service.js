import api from "@/lib/axios";

export const createPaymentOrder = async (orderDetails) => {
    const response = await api.post("/create-order", orderDetails);
    return response.data?.data;
};

export const verifyPayment = async (paymentDetails) => {
    const response = await api.post("/verify-payment", paymentDetails);
    return response.data?.data;
};