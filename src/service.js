import http_common from "./http_common";

const service = {
    login: (values) => {
        return http_common.post('/login', values)
    },
    signup: (values) => {
        return http_common.post('/signup', values)
    },
    getOrder: () => {
        return http_common.get('/getorder')
    },
    newOrder: (name, contact_number, delivery_address, food_item, payment_method, total_amount) => {
        return http_common.post('/neworder', { name, contact_number, delivery_address, food_item, payment_method, total_amount })
    },
    updateOrder: (_id, name, contact_number, delivery_address, food_item, payment_method, total_amount) => {
        return http_common.put(`/updateorder?id=${_id}`, { name, contact_number, delivery_address, food_item, payment_method, total_amount })
    },
    deleteOrder: (_id) => {
        return http_common.delete(`/deleteorder?id=${_id}`)
    }
}

export default service;