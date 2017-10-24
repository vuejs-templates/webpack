/**
 * Created by cuppi on 2017/10/24.
 */

/* eslint-disable */
import {JToolObject as ObjectTool, JToolDate as DateTool} from 'jbzwebsdk';

function _netCityToCity(city) {
  return {id: city.id, name: city.city_name, latin: city.city_en};
}

export default {
  'cityUrl.jbzCities': () => {
  },
  'cityUrl.jbzCityByCoordinate': () => {
  },
  'cityUrl.jbzCityById': () => {
  },
  'cityUrl.jbzDistricts': () => {
  },
  'cityUrl.jbzHotCities': () => {
  },


  'filmUrl.jbzHotFilms': () => {
  },
  'filmUrl.jbzHotFilmsPage': () => {
  },
  'filmUrl.jbzHotFilmsSimple': () => {
  },
  'filmUrl.jbzWaitFilms': () => {
  },
  'filmUrl.jbzWaitFilmsPage': () => {
  },
  'filmUrl.jbzFilmDetailByPartner': () => {
  },
  'filmUrl.jbzFilmDetail': () => {
  },
  'filmUrl.jbzFilmDate': () => {
  },


  'cinemaUrl.jbzDetail': () => {
  },
  'cinemaUrl.jbzList': () => {
  },
  'cinemaUrl.jbzScreeningFilmList': () => {
  },
  'cinemaUrl.jbzScreeningDateList': () => {
  },
  'cinemaUrl.jbzScreeningItems': () => {
  },

  'cinemaUrl.jbzRealtimeSeat': () => {
  },
  'cinemaUrl.jbzRealtimeSmartSeat': () => {
  },

  'tradeUrl.jbzLockSeat': () => {
  },
  'tradeUrl.jbzWebAtAppApplyTicket': () => {
  },

  'otherUrl.jbzBanners': () => {
  }
};
/* eslint-enable */
