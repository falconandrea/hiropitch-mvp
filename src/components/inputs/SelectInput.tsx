export interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
}: SelectInputProps) {
  return (
    <div>
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-bold text-gray-700'
          htmlFor={name}
        >
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        >
          <option value='' disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
