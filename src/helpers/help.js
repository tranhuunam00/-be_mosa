const enums = require('../constants/enum');
function isVietnamesePhoneNumber(number) {
  console.log(number);
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * 10000);
};

const checkDate = (date) => {
  const arrDate = date.split('-');
  console.log(arrDate);
  if (arrDate.length !== 3) return false;
  if (arrDate[0].length !== 4) return false;
  if (arrDate[1].length !== 2 || arrDate[2].length !== 2) return false;
  return true;
};

const rankStatusOrder = () => {
  const number = {};
  Object.keys(enums.StatusOrder).forEach((s) => {
    switch (s) {
      case enums.StatusOrder.CANCEL:
        number[enums.StatusOrder.CANCEL] = 6;
      case enums.StatusOrder.CONFIRM:
        number[enums.StatusOrder.CONFIRM] = 2;
      case enums.StatusOrder.DELIVERY_SHIP:
        number[enums.StatusOrder.DELIVERY_SHIP] = 3;
      case enums.StatusOrder.NOT_CONFIRMED:
        number[enums.StatusOrder.NOT_CONFIRMED] = 7;
      case enums.StatusOrder.PREPARE:
        number[enums.StatusOrder.PREPARE] = 1;
      case enums.StatusOrder.SHIP:
        number[enums.StatusOrder.SHIP] = 4;
      case enums.StatusOrder.SUCCESS:
        number[enums.StatusOrder.SUCCESS] = 5;
    }
  });
  return number;
};
module.exports = { isVietnamesePhoneNumber, randomNumber, rankStatusOrder, checkDate };
