/**
 * Created by cuppi on 2017/10/24.
 */
'use strict';
class LocalInfoManager {
  static async setLoginAccount(account) {
    try {
      let _account = JSON.stringify({user: account.jbzAccount, session: account.jbzSession});
      await window.localStorage.setItem('account', _account);
      return {user: account.jbzAccount, session: account.jbzSession};
    } catch (error) {
      // Error saving dat
      console.log('LocalInfoManager - setLoginAccount error: ' + error);
      return error;
    }
  }

  static async removeLoginAccount() {
    try {
      let _account = null;
      this.getLoginedAccount().then(account => {
        _account = account;
      }, error => {
        throw new Error(error);
      });
      await window.localStorage.removeItem('account');
      return _account;
    } catch (error) {
      // Error saving dat
      console.log('LocalInfoManager - removeLoginAccount error: ' + error);
      return error;
    }
  }

  static async getLoginedAccount() {
    try {
      const value = await window.localStorage.getItem('account');
      return JSON.parse(value);
    } catch (error) {
      // Error retrieving data
      console.log('LocalInfoManager - getLoginedAccount error: ' + error);
      return error;
    }
  }

  static async removeCachedCity() {
    try {
      let _account = null;
      this.getLoginedAccount().then(account => {
        _account = account;
      }, error => {
        throw new Error(error);
      });
      await window.localStorage.removeItem('account');
      return _account;
    } catch (error) {
      // Error saving dat
      console.log('LocalInfoManager - set error: ' + error);
      return error;
    }
  }

  static async getCachedCity() {
    try {
      const value = await window.localStorage.getItem('city');
      return JSON.parse(value);
    } catch (error) {
      // Error retrieving data
      console.log('LocalInfoManager - hasCityCache error: ' + error);
      return error;
    }
  }

  static async setItem(key, value, complete) {
    console.log(value);
    let _error = null;
    try {
      await window.localStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      console.log('LocalInfoManager - set error: ' + error);
      _error = error;
    }
    if (complete) {
      complete(_error);
    }
  }

  static async getItem(key, complete) {
    let _value = null;
    let _error = null;
    try {
      _value = await window.localStorage.getItem(key);
    } catch (error) {
      // Error retrieving data
      console.log('LocalInfoManager - get error: ' + error);
      _error = error;
    }
    if (complete) {
      complete(_error, _value);
    }
  }
}

export default LocalInfoManager;
