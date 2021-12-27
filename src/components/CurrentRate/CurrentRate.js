import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./CurrentRate.module.css";

import { getAllExchangeRatesDataThunk } from "../../store/exchangeRates/actions";

const CurrentRate = () => {
  const dispatch = useDispatch();
  const exchangeRatesData = useSelector(
    (store) => store.exchangeRates.exchangeRatesData
  );
  const [currencyFrom, setCurrencyFrom] = useState("");

  const rates = Object.entries(exchangeRatesData);
  const currencies = ["USD", "AUD", "CAD", "PLN", "MXN"];

  useEffect(() => {
    if (currencyFrom) {
        dispatch(getAllExchangeRatesDataThunk(currencyFrom, currencies));
    }
  }, [currencyFrom]);

  const onInputText = ({ target: { value } }) => {
    setCurrencyFrom(value);
  };

  return (
    <div className={classes.CurrentRate}>
      <select onChange={onInputText} className={classes.select}>
        {currencies.map((el, index) => (
          <option key={index}>{el}</option>
        ))}
      </select>
      {rates?.map((el) => {
        const regExp = /_/gm;
        const regExp2 = /,/gm;
        const currenciesString = el[0].replace(regExp, " in ");
        const currenciesString2 = currenciesString.replace(regExp2, " = ");
        return <p>{currenciesString2}</p>;
      })}
    </div>
  );
};
export default React.memo(CurrentRate);
