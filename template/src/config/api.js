let dataServer = '';

let metaDir = './meta-info/';

let metaPath = (path) => {
    return metaDir + path;
};

let dataPath = (path) => {
    return dataServer + path;
};

export default {
    'SCHOOL_DETAIL_UPDATE_JSON': metaPath('school_detail_update.json'),
    'FEEDBACK_LIST_JSON': metaPath('/feedback_list.json'),
    'UPDATE_INFO': dataPath('info/update')
};
