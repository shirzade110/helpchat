import React from 'react';

import {AsyncStorage, Platform, Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import {configuration} from '../config/AppUrl';

// Translation Script
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

import en from '../languages/en.json';
import fr from '../languages/fr.json';
import fc from '../languages/fc.json';
import gr from '../languages/gr.json';

class Helper extends React.Component {
  static toast;
  static registerToast(toast) {
    Helper.toast = toast;
  }

  static language = 'fr';

  static translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );

  static setI18nConfig = (lang) => {
    Helper.translate.cache.clear();
    i18n.translations = {
      en,
      fr,
      fc,
      gr,
    };
    i18n.locale = lang;
  };

  static showToast(msg) {
    if (msg) {
      Toast.show(msg, {
        duration: 2000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }

  static getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  }

  static async setData(key, val) {
    try {
      let tempval = JSON.stringify(val);
      await AsyncStorage.setItem(key, tempval);
    } catch (error) {
      console.error(error, 'AsyncStorage');
    }
  }

  static getDiffrenceTime(date) {
    var currentDay = new Date();
    let currentDate =
      currentDay.getFullYear() +
      '/' +
      (currentDay.getMonth() + 1) +
      '/' +
      currentDay.getDate();

    let currentTime =
      currentDay.getHours() +
      ':' +
      currentDay.getMinutes() +
      ':' +
      currentDay.getSeconds();

    let current = currentDate + ' ' + currentTime;

    console.log('CURENT', current);

    diffInMilliseconds = Math.abs(new Date(current) - new Date(date));

    let diffInMilliseconds = diffInMilliseconds / 10000 / 360 / 24;

    let timeLabel = '';
    let timeValue = 0;

    if (diffInMilliseconds > 30) {
      timeLabel = 'month';
      timeValue = Math.round(diffInMilliseconds / 30);
    } else if (diffInMilliseconds < 30) {
      if (diffInMilliseconds > 1) {
        timeLabel = 'day';
        timeValue = Math.round(diffInMilliseconds);
      } else if (diffInMilliseconds < 1) {
        if (diffInMilliseconds > 0.05) {
          timeLabel = 'house';
          timeValue = Math.round(diffInMilliseconds * 10);
        } else {
          timeLabel = 'min';
          timeValue = Math.round(diffInMilliseconds * 1000) + 2;
        }
      }
    }

    let label = timeValue + '  ' + timeLabel + ' ' + 'ago';

    return label;
  }

  static async getData(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value) {
        let newvalue = JSON.parse(value);
        return newvalue;
      } else {
        return value;
      }
    } catch (error) {
      console.error(error, 'AsyncStorage');
    }
  }

  static async removeData(key) {
    AsyncStorage.removeItem(key);
  }

  // ---- make request ----
  static async makeRequest({url, data, method = 'POST', loader = true}) {
    let finalUrl = configuration.MAIN_URL + url;
    console.log(finalUrl, 'finalUrl');
    let form;
    let methodnew;

    let token = await this.getData('token');
    let varheaders;

    if (method == 'POST') {
      methodnew = 'POST';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
        form = JSON.stringify(data);
      } else {
        console.log('DATTATATA', data);
        form = data;
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        form = JSON.stringify(data);
      }
    } else if (method === 'GET') {
      methodnew = 'GET';
      if (token) {
        varheaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        };
      } else {
        varheaders = {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        };
      }
    } else if (method === 'PUT') {
      methodnew = 'PUT';
      form = data;
      varheaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      form = JSON.stringify(data);
    } else if (method === 'FORMDATA') {
      methodnew = 'POST';
      form = data;
      varheaders = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token,
      };
    }
    console.log(varheaders);
    console.log(form);
    console.log(methodnew);
    console.log('URL', finalUrl);

    return fetch(finalUrl, {
      body: form,
      method: methodnew,
      headers: varheaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.hasOwnProperty('status_code')) {
          if (responseJson.status_code === 401) {
            AsyncStorage.removeItem('userdata');
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('is_social_login');
            Actions.Login();
            this.showToast(responseJson.error);
          }
        } else return responseJson;
      })
      .catch((error, a) => {
        this.showToast('Please check your internet connection.');
        console.log('errorerror', error);
      });
  }

  static getImageUrl(url) {
    return configuration.MAIN_URL + url;
  }
}

export default Helper;
