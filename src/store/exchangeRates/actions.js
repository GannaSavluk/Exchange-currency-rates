import ACTypes from "../types";

export const changeExchangeRatesData = (key, value) => ({
  type: ACTypes.EXCHANGE_RATES_DATA,
  payload: { key, value },
});

export const saveCurrentExchangeRate = (rate) => ({
  type: ACTypes.EXCHANGE_RATE,
  payload: { rate },
});

export const setDateNow = (dateNow) => ({
  type: ACTypes.SET_DATE_NOW,
  payload: { dateNow },
});

export const getExchangeRatesDataThunk =
  (currencyFrom, currencyTo) => async (dispatch) => {
    try {
      const response = await fetch(
        `https://free.currconv.com/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=16197df853d615d2cb42`,
        {
          method: "get",
        }
      );
      const data = await response.json();
      dispatch(saveCurrentExchangeRate(Object.entries(data)[0]));
    } catch (err) {
      console.log(err);
    }
  };

export const getAllExchangeRatesDataThunk =
  (currencyFrom, currencies) => async (dispatch) => {
    try {
      for (let currencyTo of currencies) {
        if (currencyTo !== currencyFrom) {
          const response = await fetch(
            `https://free.currconv.com/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=16197df853d615d2cb42`,
            {
              method: "get",
            }
          );
          const data = await response.json();
          dispatch(changeExchangeRatesData(Object.entries(data)[0], Object.entries(data)[1]));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
