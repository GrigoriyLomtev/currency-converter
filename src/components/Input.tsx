import React from 'react';

export interface IInputProps {
  amount: number;
  placeholder: string;
  readOnly?: boolean;
  onChangeAmount?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, readOnly, amount, onChangeAmount }: IInputProps) {
  return (
    <input
      className="w-100"
      type="number"
      placeholder={placeholder}
      value={amount}
      onChange={onChangeAmount}
      readOnly={readOnly}
    />
  );
}

export default Input;
