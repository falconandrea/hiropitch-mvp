export interface NumberInputProps {
  label: string;
  placeholder: string;
  name: string;
  step: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function NumberInput({
  label,
  placeholder,
  name,
  required = false,
  step = '1',
  value,
  onChange,
}: NumberInputProps) {
  return (
    <div>
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-bold text-gray-700'
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type='number'
          min='1'
          step={step}
          id={name}
          required={required}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        />
      </div>
    </div>
  );
}
