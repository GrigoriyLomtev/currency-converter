import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import CurrencyBlock from "./components/CurrencyBlock";

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest";

let myHeaders = new Headers();
myHeaders.append("apikey", "UvutixKmnrrL98MexRZlQKDsRTnMsCMY");

let requestOptions: RequestInit = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};
interface IResult {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [x: string]: number;
  };
}

function App() {
  const [currencyOption, setCurrencyOption] = useState<string[]>([]);
  const [currencyFrom, setCurrencyFrom] = useState<string>("");
  const [currencyTo, setCurrencyTo] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [amountFrom, setAmountFrom] = useState<number>(0);
  const [amountTo, setAmountTo] = useState<number>(0);

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then((response) => response.json())
      .then((result: IResult) => {
        const firstCurrency = Object.keys(result.rates)[0];
        // setCurrencyOption([result.base, ...Object.keys(result.rates)]);
        setCurrencyOption([...Object.keys(result.rates)]);
        setCurrencyFrom(result.base);
        setCurrencyTo(firstCurrency);
        setExchangeRate(result.rates[firstCurrency]);
        // setResult(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (currencyFrom !== "" && currencyTo !== "") {
      fetch(
        `${BASE_URL}?base=${currencyFrom}&symbols=${currencyTo}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((result) => setExchangeRate(result.rates[currencyTo]));
    }
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    setAmountTo(amountFrom * exchangeRate);
  }, [amountFrom, exchangeRate]);

  const selectHandlerCurrencyFrom = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrencyFrom(e.target.value);
  const selectHandlerCurrencyTo = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrencyTo(e.target.value);

  const inputHandlerAmountFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);

    setAmountFrom(amount);
    setAmountTo(amount * exchangeRate);
  };

  return (
    <div className=" container ">
      <h1 className=" text-center">Converter</h1>
      <div className=" d-flex justify-content-center">
        <div>
          <CurrencyBlock
            selectTitle={"Базовая валюта"}
            currencyOption={currencyOption}
            placeholder={"Введите число"}
            readOnly={false}
            amount={amountFrom}
            selectedCurrency={currencyFrom}
            onChangeCurrency={selectHandlerCurrencyFrom}
            onChangeAmount={inputHandlerAmountFrom}
          />
        </div>
        <span className="align-self-center p-2 ">=</span>
        <div>
          <CurrencyBlock
            selectTitle={"Целевая валюта"}
            currencyOption={currencyOption}
            placeholder={"Итоговое число"}
            readOnly={true}
            amount={amountTo}
            selectedCurrency={currencyTo}
            onChangeCurrency={selectHandlerCurrencyTo}
            // onChangeAmount={selectHandlerAmountFrom}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
