import { rename } from "fs";

// 映射及计算

export const USER = state => state.USER
export const AUTH_URL = state => state.AUTH_URL
export const LEADER_CONTACT_CASE = state => state.LEADER_CONTACT_CASE
export const SELECT_LEADER_CONTACT_CASE = state => state.SELECT_LEADER_CONTACT_CASE
export const COMMON_PERSON_SELECT_CACHE = state => state.COMMON_PERSON_SELECT_CACHE
export const COMMON_LEADER_SELECTED_CACHE = state => state.COMMON_LEADER_SELECTED_CACHE

//相关人
export const COMMON_ABOUT_SELECTED_CACHE = state => state.COMMON_ABOUT_SELECTED_CACHE

// @ren
export const AT_PERSON_STATE=state=>state.AT_PERSON_STATE
