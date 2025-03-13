import Toast from 'react-native-root-toast';
import Helper from '../config/Helper';
import ReactNative, {Alert} from 'react-native';
const VALIDATE = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ALPHABET_ONLY: /^[a-zA-Z \s]*$/,
  NUMBER: /[0-9]$/,
  MOBILE: /^[0-9]{1,20}$/,
  STREET: /^[a-zA-Z0-9 '-.~!@#$%^&*()_+={}[];':"<>,.\s]*$/,
  PASSWORD: /[d\-_\s]+$/,
};

export const validators = {
  checkAlphabet: (name, min, max, value) => {
    var min = min || 5;
    var max = max || 40;
    if (value) {
      if (!VALIDATE.ALPHABET_ONLY.test(value)) {
        Toast.show(name + ' is Invalid.');
        return false;
      } else if (value.length < min || value.length > max) {
        Toast.show(`${name} must be between ${min} to ${max} Characters.`);
        return false;
      }
      return true;
    } else {
      Toast.show(name + ' is Required.');
      return false;
    }
  },

  checkEmail: (name, value) => {
    if (value) {
      if (!VALIDATE.EMAIL.test(value)) {
        Toast.show('${name} is Invalid.');
        return false;
      }
    } else {
      Toast.show(`${name} is Required.`);
      return false;
    }
    return true;
  },

  checkNumber: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (!VALIDATE.NUMBER.test(value)) {
        Toast.show(`${name} is Invalid.`);
        return false;
      } else if (value.length < min || value.length > max) {
        Toast.show(
          `${name} entered must be between ${min} to ${max} Characters.`,
        );
        return false;
      }
      return true;
    } else {
      Toast.show(`${name} is Required.`);
      Alert.alert('شماره', 'فیلد شماره اجباری است');
      return false;
    }
  },

  checkPhoneNumber: (name, value) => {
    var min = min || 5;
    var max = max || 15;
    // if (value) {
    //   if (!VALIDATE.MOBILE.test(value)) {
    //     Helper.showToast(`${name} is Invalid.`);
    //     return false;
    //   } else if (value.length < min || value.length > max) {
    //     Helper.showToast(`${name} should be greater than ${min - 1} digits.`);
    //     return false;
    //   }
    //   return true;
    // } else {

    if (!value) {
      Helper.showToast(`${name} is Required.`);
      return false;
    }

    // if (value) {
    //     if (!VALIDATE.MOBILE.test(value)) { Toast.show(`${name} is Invalid.`); return false }
    //     else if (value.length != minMax) { Toast.show(`${name} must be  ${minMax} digits.`); return false }
    //     return true
    // }
    // else { Toast.show(`${name} is Required.`); return false }
  },

  checkNotNull: (name, value) => {
    if (value) {
      return true;
    } else {
      Toast.show(`${name} is Required.`);
      return false;
    }
  },

  checkRequire: (name, value) => {
    if (value) {
      return true;
    } else {
      Toast.show(`Please enter ${name}`);
      return false;
    }
  },

  checkPassword: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (VALIDATE.PASSWORD.test(value)) {
        Alert.alert('پسورد', 'پسورد نامعتبر است');
        Toast.show(`${name} is Invalid.`);
        return false;
      } else if (value.length < min || value.length > max) {
        Alert.alert('پسورد', 'پسورد نامعتبر است');
        Toast.show(
          `${name} entered must be between ${min} to ${max} Characters.`,
        );
        return false;
      }
      return true;
    } else {
      Alert.alert('پسورد', 'پسورد اجباری است');
      Toast.show(`${name} is Required.`);
      return false;
    }
  },

  checkMatch: (name, value, name2, value2) => {
    var min = min || 5;
    var max = max || 40;
    if (value == value2) {
      return true;
    } else {
      Toast.show(`${name} and ${name2} should be same.`);
      return false;
    }
  },

  checkStreet: (name, min, max, value) => {
    var min = min || 7;
    var max = max || 15;
    if (value) {
      if (VALIDATE.STREET.test(value)) {
        Toast.show(`${name} is Invalid.`);
        return false;
      } else if (value.length < min || value.length > max) {
        Toast.show(
          `${name} entered must be between ${min} to ${max} Characters.`,
        );
        return false;
      }
      return true;
    } else {
      Toast.show(`${name} is Required.`);
      return false;
    }
  },
};
