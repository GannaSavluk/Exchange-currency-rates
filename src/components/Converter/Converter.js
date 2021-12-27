import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Converter.module.css";

import { getExchangeRatesDataThunk } from "../../store/exchangeRates/actions";

const Converter = () => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector(
    (store) => store.exchangeRates.currentExchangeRate
  );
  const [inputValue, setInputValue] = useState({ text: "" });
  const [inputNumber, setInputNumber] = useState(0);
  const [inputSecondCurrency, setInputSecondCurrency] = useState("");
  const [firstCurrencyData, setFirstCurrencyData] = useState("");
  const [secondCurrencyData, setSecondCurrencyData] = useState("");

  useEffect(() => {
    const resultNumber = exchangeRate[1] * inputNumber;
    setSecondCurrencyData(`${resultNumber} ${inputSecondCurrency}`);
  }, [exchangeRate]);

  const onInputText = ({ target: { value } }) => {
    setInputValue((prev) => ({ ...prev, text: value }));
  };

  const sendRequest = () => {
    const regExpFindNumber = /\d{1,}/gm;
    const regExpFindRates = /[^\d]\w{3,}/gm;

    const numberArray = inputValue.text.match(regExpFindNumber);
    const currencyArray = inputValue.text.match(regExpFindRates);

    const currencyFrom = currencyArray[0].trim().toUpperCase();
    const currencyTo = currencyArray[1].trim().toUpperCase();

    setInputNumber(Number(numberArray[0]));
    setInputSecondCurrency(currencyArray[1].toUpperCase());
    setFirstCurrencyData(
      `${numberArray[0]} ${currencyArray[0].trim().toUpperCase()}`
    );

    dispatch(getExchangeRatesDataThunk(currencyFrom, currencyTo));
  };

  return (
    <div className={classes.Converter}>
      {inputSecondCurrency && (
        <h3>
          {firstCurrencyData} = {secondCurrencyData}
        </h3>
      )}
      <input type="text" name="text" onChange={onInputText}></input>
      <button onClick={sendRequest} className={classes.button}>
        Узнать курс
      </button>
      <p>Пожалуйста введите данные согласно шаблону: 1000 сad in usd</p>
    </div>
  );
};
export default React.memo(Converter);
