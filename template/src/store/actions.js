const actions = {
    changeName ({commit}, payload) { // 自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('CHANGE_NAME');
                resolve();
            }, 500);
        });
    }
};

export default actions;
