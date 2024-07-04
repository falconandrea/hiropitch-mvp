import React from 'react';

type MultipleTextsProps = {
  label: string;
  name: string;
  values: string[];
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddValue: () => void;
  onRemoveValue: (index: number) => void;
  inputValue: string;
};

export default function MultipleTexts({
  label,
  name,
  values,
  placeholder,
  onChange,
  onAddValue,
  onRemoveValue,
  inputValue,
}: MultipleTextsProps) {
  return (
    <div className='mb-4'>
      <label
        className='mb-2 block text-sm font-bold text-gray-700'
        htmlFor={name}
      >
        {label}
      </label>
      <div className='flex'>
        <input
          type='text'
          id={name}
          value={inputValue}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onAddValue();
            }
          }}
          name={name}
          placeholder={placeholder}
          className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        />
        <span
          onClick={onAddValue}
          className='focus:shadow-outline ml-2 cursor-pointer rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none'
        >
          Add
        </span>
      </div>
      <ul className='mt-4'>
        {values &&
          Array.isArray(values) &&
          values.map((value, index) => (
            <li
              key={index}
              className='mt-2 flex justify-between rounded bg-gray-200 p-2'
            >
              {value}
              <small
                onClick={() => onRemoveValue(index)}
                className='ml-2 cursor-pointer text-red-500'
              >
                (Remove)
              </small>
            </li>
          ))}
      </ul>
    </div>
  );
}
