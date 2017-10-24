/**
 * Created by cuppi on 2017/10/24.
 */
import {LOCATION} from '../mutations';

const defaultLocation = {
  latitude: 31.176241,
  longitude: 121.399367,
  hasLocation: false
};

const defaultLocationCity = {
  id: 2,
  name: '加载中',
  formatAddress: '',
  hasLocationCity: false,
  isFirst: true
};

const LocationModule = {
  state: {
    location: defaultLocation,
    locationCity: defaultLocationCity,
    userLocationCity: defaultLocationCity
  },
  mutations: {
    [LOCATION.UPDATE_LOCATION](state, location = defaultLocation){
      console.log('vuex更新定位');
      if (!location) {
        console.log('存在非法定位');
        location = defaultLocation;
        return;
      }
      state.location = location;
    },
    [LOCATION.UPDATE_LOCATION_CITY](state, locationCity = defaultLocationCity){
      console.log('vuex更新定位城市');
      if (!locationCity || !locationCity.hasOwnProperty('id')) {
        console.log('存在非法定位城市');
        locationCity = defaultLocationCity;
        return;
      }
      state.locationCity = {
        ...locationCity
      };
    },
    [LOCATION.UPDATE_USER_LOCATION_CITY](state, userLocationCity = defaultLocationCity){
      console.log('vuex更新用户定位城市');
      if (!userLocationCity) {
        console.log('存在非法定位城市');
        userLocationCity = defaultLocationCity;
        return;
      }
      state.userLocationCity = {
        ...state.userLocationCity,
        ...userLocationCity,
        isFirst: false
      };

      // 记录历史城市
      let historyCities = JSON.parse(window.localStorage.getItem('historyCities'));
      if (!historyCities) {
        historyCities = [];
      }
      let sameIndex = -1;
      historyCities.forEach((item, index) => {
        if (item.name === userLocationCity.name) {
          sameIndex = index;
        }
      })
      let historyCity = {id: userLocationCity.id, name: userLocationCity.name, latin: userLocationCity.latin}
      if (sameIndex >= 0) {
        historyCities.splice(sameIndex, 1);
        historyCities.unshift(historyCity)
      } else {
        historyCities.unshift(historyCity)
        if (historyCities.length > 3) {
          historyCities.pop(historyCity)
        }
      }
      window.localStorage.setItem('historyCities', JSON.stringify(historyCities));
    }
  }
}

export default LocationModule;
