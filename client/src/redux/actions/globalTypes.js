export const GLOBALTYPES = {
    AUTH: 'AUTH',
    ALERT: 'ALERT',
    THEME: 'THEME',
    SHOW_SEARCH_FILTER: 'SHOW_SEARCH_FILTER',
    STATUS: 'STATUS',
    COMMENT_POPUP: 'COMMENT_POPUP',
    EDIT_COMMENT_POPUP: 'EDIT_COMMENT_POPUP',
    SHOW_COMMENT: 'SHOW_COMMENT',
    SOCKET: 'SOCKET'
}
export const EditData = (data, id, post) => {
    const newData = data.map(item => 
        (item._id === id ? post : item)
    )
    return newData;
}
export const DeleteData = (data, id) => {
    const newData = data.filter(item => item._id !== id)
    return newData;
}
export const DeleteData2 = (data, id) => {
    const newData = data.filter(item => item !== id)
    return newData;
}

