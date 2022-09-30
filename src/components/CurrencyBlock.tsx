import React from "react";
import CurrencySelect, { ICurrencySelectProps } from "./CurrencySelect";
import Input, { IInputProps } from "./Input";

interface ICurrencyBlockProps {
  selectTitle: string;
  currencyOption: string[];
  amount: number;

  placeholder: string;
  readOnly: boolean;

  selectedCurrency: string;
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // onChangeCurrency: () => string;
  onChangeAmount?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// function CurrencyBlock({currencyOption, amountFrom, selectTitle}:ICurrencySelectProps|IInputProps) {
function CurrencyBlock({
  selectTitle,
  currencyOption,
  amount,
  placeholder,
  readOnly,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
}: ICurrencyBlockProps) {
  return (
    <div>
      <CurrencySelect
        selectTitle={selectTitle}
        currencyOption={currencyOption}
        selectedCurrency={selectedCurrency}
        onChangeCurrency={onChangeCurrency}
      />
      <br />
      <Input
        placeholder={placeholder}
        readOnly={readOnly}
        amount={amount}
        onChangeAmount={onChangeAmount}
      />
    </div>
  );
}

export default CurrencyBlock;
