import React from 'react';

export interface ICurrencySelectProps {
  selectTitle: string;
  currencyOption: string[];
  selectedCurrency: string;
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CurrencySelect({ selectTitle, currencyOption, selectedCurrency, onChangeCurrency }: ICurrencySelectProps) {
  return (
    <div className="form-floating">
      <select
        className="form-select"
        id="floatingSelect"
        aria-label="Floating label select example"
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyOption.map((c) => (
          <option key={c + ' ' + selectTitle} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label htmlFor="floatingSelect">{selectTitle}</label>
    </div>
  );
}

export default CurrencySelect;
