import axios from 'axios'
import {MAIN_URL} from './Url'

export function getProducts(){
    return axios.get(`${MAIN_URL}products/get-product`)
}

export function productDetails(id){
    return axios.get(`${MAIN_URL}products/product-details/${id}`)
}

export function getColors(id){
    return axios.get(`${MAIN_URL}products/color/${id}`)
}

export function getAllColors(){
    return axios.get(`${MAIN_URL}products/all-colors`)
}

export function getAllCategories(){
    return axios.get(`${MAIN_URL}products/all-category`)
}

export function cartItems(values){
    return axios.post(`${MAIN_URL}products/cart-items/${values.email}`,values)
}