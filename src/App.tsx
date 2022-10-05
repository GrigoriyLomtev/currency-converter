import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CurrencyBlock from './components/CurrencyBlock';
import { RATES_ENDPOINT, API_KEY } from './config';
import axios, { AxiosRequestConfig } from 'axios';

const requestOptions: AxiosRequestConfig = {
  method: 'GET',
  headers: { apikey: API_KEY },
};

interface IApiResponse {
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
  const [currencyFrom, setCurrencyFrom] = useState<string>('');
  const [currencyTo, setCurrencyTo] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [amountFrom, setAmountFrom] = useState<number>(0);
  const [amountTo, setAmountTo] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<IApiResponse>(RATES_ENDPOINT, requestOptions);

        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOption([...Object.keys(data.rates)]);
        setCurrencyFrom(data.base);
        setCurrencyTo(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currencyFrom !== '' && currencyTo !== '') {
      axios
        .get(`${RATES_ENDPOINT}?base=${currencyFrom}&symbols=${currencyTo}`, requestOptions)
        .then(({ data }) => setExchangeRate(data.rates[currencyTo]));
    }
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    setAmountTo(amountFrom * exchangeRate);
  }, [amountFrom, exchangeRate]);

  const selectHandlerCurrencyFrom = (e: React.ChangeEvent<HTMLSelectElement>) => setCurrencyFrom(e.target.value);
  const selectHandlerCurrencyTo = (e: React.ChangeEvent<HTMLSelectElement>) => setCurrencyTo(e.target.value);

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
            selectTitle={'Базовая валюта'}
            currencyOption={currencyOption}
            placeholder={'Введите число'}
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
            selectTitle={'Целевая валюта'}
            currencyOption={currencyOption}
            placeholder={'Итоговое число'}
            readOnly={true}
            amount={amountTo}
            selectedCurrency={currencyTo}
            onChangeCurrency={selectHandlerCurrencyTo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
