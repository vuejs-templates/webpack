/**
 * Created by cuppi on 2017/10/24.
 */
'use strict';

import GlobalConstant from './GlobalConstant.js';
import BMap from 'BMap';

let instance = null;

class LocationManager {
  static defaultLocation = {
    latitude: 31.237037783,
    longitude: 121.4834974484,
    hasLocation: false
  };

  static defaultLocationCity = {
    id: 2,
    name: '上海',
    address: '上海市黄浦区福州路117号',
    hasLocationCity: false
  };

  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  static getLocation() {
    let geolocation = new BMap.Geolocation();
    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition((data) => {
        // if (geolocation.getStatus() === 0 && data.accuracy !== null) {
        if (geolocation.getStatus() === 0) {
          GlobalConstant.store.commit('UPDATE_LOCATION_MUTATION', {
            hasLocation: true,
            latitude: data.latitude,
            longitude: data.longitude
          });
          resolve(data);
        } else {
          GlobalConstant.store.commit('UPDATE_LOCATION_MUTATION');
          reject(new Error('无法获取定位'));
        }
      }, () => {
        GlobalConstant.store.commit('UPDATE_LOCATION_MUTATION');
        reject(new Error('无法获取定位'));
      }, {enableHighAccuracy: true})
    });
  }
}

export default LocationManager;
