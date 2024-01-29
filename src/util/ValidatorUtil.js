
const MOBILE_NUMBER_REGEX = /^0+[0-9]{9}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NIC_REGEX = /^([0-9]{9}([V]|[v]|[X]|[x]))|([0-9]{12})$/;
const Name_REGEX = /^[A-z ]+$/;
const PASSWORD_REGEX = /^.{8,}$/;

export class ValidatorUtil {

  static isValidNic(nic): boolean {
    return NIC_REGEX.test(nic);
  }

  static isValidMobile(mobileNumber): boolean {
    return MOBILE_NUMBER_REGEX.test(mobileNumber);
  }

  static isValidEmail(email): boolean {
    return EMAIL_REGEX.test(email);
  }

  static isValidName(name): boolean {
    return Name_REGEX.test(name);
  }

  static isValidPassword(password): boolean {
    return PASSWORD_REGEX.test(password);
  }

  static isEmpty(inputValue): boolean {
    return inputValue == null || inputValue === '';
  }

}
