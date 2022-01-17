import axios from 'axios'
import {MAIN_URL} from './Url'
let token = localStorage.getItem('_token');

export function register(values){
    return axios.post(`${MAIN_URL}users/register`,values)
}

export function socialRegister(values){
    return axios.post(`${MAIN_URL}users/social-register`,values)
}

export function login(values){
    return axios.post(`${MAIN_URL}users/login`,values)
}

export function SocialLogin(values){
    return axios.post(`${MAIN_URL}users/social-login`,values)
}

export function verifyOtp(data){
    return axios.post(`${MAIN_URL}users/verify-otp`,data)
}

export function emailSend(data){
    return axios.post(`${MAIN_URL}users/email-send`,data)
}

export function forgotPassword(values){
    return axios.post(`${MAIN_URL}users/forgot-password`,values)
}


//profile module
export function editProfile(values){
    return axios.put(`${MAIN_URL}users/edit-profile/${values.email}`,values,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}

export function getUserdetails(values){
    return axios.get(`${MAIN_URL}users/get-user/${values}`,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}

export function changePassword(values){
    return axios.post(`${MAIN_URL}users/change-password/${values.email}`,values,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}

export function addAddress(values){
    return axios.post(`${MAIN_URL}users/add-address/${values.email}`,values,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}

export function updateAddress(values){
    return axios.put(`${MAIN_URL}users/edit-address/${values.email}`,values,{
        headers:{"Authorization":`Bearer ${token}`}}
    )}
