let dataServer = '';

let metaDir = '../meta-info/';

let metaPath = (path) => {
    return metaDir + path;
};

let dataPath = (path) => {
    return dataServer + path;
};

export default {
    'USER_LIST_META': metaPath('user_list.json'),
    'USER_INFO_META': metaPath('user_view.json'),
    'SCHOOL_DETAIL_UPDATE_META': metaPath('school_detail_update.json'),
    'FEEDBACK_LIST_META': metaPath('feedback_list.json'),
    'UPDATE_INFO': dataPath('info/update')
};
