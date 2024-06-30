export interface TextareaInputProps {
  label: string;
  placeholder: string;
  name: string;
  required: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextareaInput({
  label,
  placeholder,
  name,
  required = false,
  value,
  onChange,
}: TextareaInputProps) {
  return (
    <div>
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-bold text-gray-700'
          htmlFor={name}
        >
          {label}
        </label>
        <textarea
          id={name}
          required={required}
          name={name}
          value={value}
          rows={5}
          onChange={onChange}
          placeholder={placeholder}
          className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        ></textarea>
      </div>
    </div>
  );
}
