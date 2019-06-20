const getters = {
    name: state => state.name,
    age: state => state.age,
    sex: (state, getters) => {
        return getters.name + state.sex;
    }
};
export default getters;
