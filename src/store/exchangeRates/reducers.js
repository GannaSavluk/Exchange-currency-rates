import ACTypes from "../types";

const initialState = {
  exchangeRatesData: {},
  currentExchangeRate: [],
  dateNow: "",
};

export const exchangeRates = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.EXCHANGE_RATES_DATA:
      return {
        ...state,
        exchangeRatesData: {
          ...state.exchangeRatesData,
          [action.payload.key]: action.payload.value,
        },
      };

    case ACTypes.EXCHANGE_RATE:
      return { ...state, currentExchangeRate: action.payload.rate };

    case ACTypes.SET_DATE_NOW:
      return { ...state, dateNow: action.payload.dateNow };
    default:
      return state;
  }
};
