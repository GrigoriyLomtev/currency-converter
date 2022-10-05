import React from 'react';

export interface IInputProps {
  amount: number;
  placeholder: string;
  readOnly?: boolean;
  onChangeAmount?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, readOnly, amount, onChangeAmount }: IInputProps) {
  return readOnly ? (
    <input className="w-100" type="number" placeholder={placeholder} value={amount} readOnly />
  ) : (
    <input className="w-100" type="number" placeholder={placeholder} value={amount} onChange={onChangeAmount} />
  );
}

export default Input;
