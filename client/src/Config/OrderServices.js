import axios from 'axios'
import {MAIN_URL} from './Url'
let token = localStorage.getItem('_token');

export function checkOut(values){
    return axios.post(`${MAIN_URL}orders/checkout`,values,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}

export function orderDetails(email){
    return axios.get(`${MAIN_URL}orders/order-details/${email}`,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}

export function invoiceDetails(id){
    return axios.get(`${MAIN_URL}orders/invoice/${id}`)
}