export const getCatagories = ({ dispatch, state }, id) => {
    dispatch('CATAGORY_LIST', [
        {stepId: 'basic', title: '基本信息'},
        {stepId: 'roll', title: '学籍信息'},
        {stepId: 'start', title: '入学信息'},
        {stepId: 'grad', title: '毕业信息'},
        {stepId: 'addr', title: '通讯信息'},
        {stepId: 'other', title: '其他'}
    ]);
};
