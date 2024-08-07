export interface TextInputProps {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  label,
  placeholder,
  name,
  required = false,
  disabled = false,
  type = 'text',
  value,
  onChange,
}: TextInputProps) {
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
          type={type}
          id={name}
          required={required}
          disabled={disabled}
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
