import React from "react";

export interface ICurrencySelectProps {
  selectTitle: string;
  currencyOption: string[];
  selectedCurrency: string;
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // onChangeCurrency: () => string;
}

function CurrencySelect({
  selectTitle,
  currencyOption,
  selectedCurrency,
  onChangeCurrency,
}: ICurrencySelectProps) {
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
          <option key={c + " " + selectTitle} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label htmlFor="floatingSelect">{selectTitle}</label>
    </div>
  );
}
// return (
//   <div className="btn-group mb-2" role="group" aria-label="Простой пример">
//     <button type="button" className="btn btn-secondary">
//       rub
//     </button>
//     <button type="button" className="btn btn-secondary">
//       usd
//     </button>
//     <button type="button" className="btn btn-secondary">
//       eur
//     </button>
//     <button type="button" className="btn btn-secondary">
//       gbr
//     </button>
//     <button type="button" className="btn btn-secondary">
//       +
//     </button>
//   </div>
// );

export default CurrencySelect;
