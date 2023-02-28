import { combineReducers } from "redux";
import auth from './authReducer'
import alert from './alertReducer'
import searchFilter from './searchFilter'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePost from './postReducer'
import comment_popup from './commentReducer'
import edit_comment_popup from './editCommentReducer'
import favorite from './favoriteReducer'
import comment from './commentFilterReducer'
import details from './detailPostReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import suggestion from './suggestReducer'
import forum from './forumReducer'
export default combineReducers({
    auth,
    alert,
    theme,
    searchFilter,
    profile,
    status,
    homePost,
    comment_popup,
    edit_comment_popup,
    favorite,
    comment,
    details,
    socket,
    notify,
    message,
    suggestion,
    forum
})