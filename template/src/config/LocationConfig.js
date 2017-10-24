/**
 * Created by cuppi on 2017/10/24.
 */
import LocationManager from '@util/LocationManager';
import LocalInfoManager from '@util/LocalInfoManager';
import GlobalConstant from '@util/GlobalConstant';
import {JToolDate} from 'jbzwebsdk';
import NetworkCity from '@network/NetworkCity'

class LocationConfig {
  /**
   * 进入APP时获取一次定位（应该只调用一次，在第一次进入APP的时候调用）
   */
  static appPickLocation() {
    return new Promise((resolve, reject) => {
      LocationManager.getLocation().then((location) => {
        NetworkCity.cityByCoordinate({latitude:location.latitude, longitude:location.longitude}).then(data => {
          resolve(location);
          // 获取到定位，获取城市
          // console.log(data);
          this._choiceIfUseCacheLocationCity(data.city);
        }, err => {
          console.log(err);
          this._choiceIfUseCacheLocationCity();
        });
      }).catch((err) => {
        reject(err);
        this._choiceIfUseCacheLocationCity();
        console.log(err);
      })
    })
  }

  /**
   * 判断是否使用缓存的城市
   * @param currentCity 当前城市 （可空）
   * @private
   */
  static _choiceIfUseCacheLocationCity(currentCity) {
    if (currentCity) {
      console.log('当前城市' + currentCity.name);
      // 更新定位城市
      this._locationCityUse(currentCity);
    } else {
      console.log('当前无法定位到城市');
      this._locationCityUse();
    }
    // 通知定位使用默认的地址,locationCityCache是'LocationCityCache'
    console.log('通知定位使用默认的地址');
    LocalInfoManager.getItem('LocationCityCache', (error, locationCityCache) => {
      // 获取本地城市缓存
      if (error) {
        // 获取本地城市缓存失败
        console.log('获取本地缓存失败' + error);
        if (currentCity) {
          // 更新用户选择城市
          this._userCityUse(currentCity);
        } else {
          // 无定位无缓存，跳转城市选择页
          this._noCityVisible();
        }
      } else {
        console.log('获取本地缓存成功' + locationCityCache);
        locationCityCache = JSON.parse(locationCityCache);
        if (locationCityCache) {
          let lastDate = new Date(locationCityCache.date);
          let city = locationCityCache.city;
          let dateSpace = (JToolDate.currentDate().getTime() - lastDate.getTime()) / 1000 / 60 / 60 / 24;
          // 缓存4天的城市
          if (locationCityCache && dateSpace <= 4) {
            // 缓存小于四天，判断使用缓存还是当前定位
            if (currentCity) {
              this._currenCityOrCacheCity(currentCity, city);
            } else {
              this._userCityUse(city);
            }
          } else {
            // 缓存大于四天
            if (currentCity) {
              // 使用当前定位
              this._userCityUse(currentCity);
            } else {
              // 使用默认
              this._noCityVisible();
            }
          }
        } else {
          // 无缓存情况
          if (currentCity) {
            // 使用当前定位
            this._userCityUse(currentCity);
          } else {
            // 使用默认
            this._noCityVisible();
          }
        }
      }
    });
    // LocalInfoManager.setItem('LocationCityCache', DateTool.currenDate());
  }

  /**
   * 定位城市使用
   * @param city 使用的定位城市（可空）
   * @private
   */
  static _locationCityUse(city) {
    // console.log(city);
    if (city) {
      GlobalConstant.store.commit('UPDATE_LOCATION_CITY_MUTATION', Object.assign(city, {hasLocationCity: true}));
    } else {
      GlobalConstant.store.commit('UPDATE_LOCATION_CITY_MUTATION');
    }
  }

  /**
   * 用户选择的城市使用
   * @param city 用户选择的城市（可空）
   * @private
   */
  static _userCityUse(city) {
    if (city) {
      GlobalConstant.store.commit('UPDATE_USER_LOCATION_CITY_MUTATION', city);
      LocalInfoManager.setItem('LocationCityCache', JSON.stringify({
        date: JToolDate.currentDate(),
        city
      }));
    } else {
      GlobalConstant.store.commit('UPDATE_USER_LOCATION_CITY_MUTATION', city);
    }
  }

  /**
   * 当没有城市可用的情况下
   * @private
   */
  static _noCityVisible() {
    console.log('无定位，无缓存，跳转到城市列表页');
    this._popupCityListView();
  }

  /**
   * 可用的缓存的城市与定位城市冲突
   */
  static _currenCityOrCacheCity(currentCity, city) {
    if (currentCity.id === city.id) {
      this._userCityUse(currentCity)
    } else {
      // 当前定位与缓存城市不一样，提示是否切换城市
      GlobalConstant.store.commit('ALERT_MUTATION', {
        showAlert: true,
        title: '温馨提示',
        content: `你当前定位在${currentCity.name}是否切换到${currentCity.name}`,
        leftText: '取消',
        rightText: '确定',
        isLeftTextShow: true,
        leftCallback: () => {
          // 取消切换城市，使用缓存城市
          LocalInfoManager.setItem('LocationCityCache', JSON.stringify({
            date: JToolDate.currentDate(),
            city
          }));
          GlobalConstant.store.commit('UPDATE_USER_LOCATION_CITY_MUTATION', city);
          GlobalConstant.store.commit('ALERT_MUTATION', {
            showAlert: false
          })
        },
        rightCallback: () => {
          // 切换城市，使用定位城市
          GlobalConstant.store.commit('UPDATE_USER_LOCATION_CITY_MUTATION', currentCity);
          LocalInfoManager.setItem('LocationCityCache', JSON.stringify({
            date: JToolDate.currentDate(),
            city: currentCity
          }));
          GlobalConstant.store.commit('ALERT_MUTATION', {
            showAlert: false
          })
        }
      });
      console.log(`你当前定位在${currentCity.name}是否切换到${currentCity.name}`)
    }
  }

  /**
   * 弹出城市列表页（目前在考虑在这个文件里使用这个是否合适）
   */
  static _popupCityListView() {
    GlobalConstant.router.push('cityList');
    console.log('跳转到城市列表页');
  }
}

export default LocationConfig;
