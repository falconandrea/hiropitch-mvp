import React, { useState, useRef, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  label: string;
  options: Option[];
  selectedValues: Option[];
  onChange: (selectedValues: Option[]) => void;
};

export default function MultiSelect({
  label,
  options,
  selectedValues,
  onChange,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleOptionClick = (option: Option) => {
    if (selectedValues.find((value) => value.value === option.value)) {
      onChange(selectedValues.filter((value) => value.value !== option.value));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='mb-4'>
      <label className='mb-2 block text-sm font-bold text-gray-700'>
        {label}
      </label>
      <div ref={dropdownRef} className='relative'>
        <div
          className='focus:shadow-outline flex w-full items-center rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
          onClick={toggleDropdown}
        >
          <div className='flex-1'>
            {selectedValues.length > 0
              ? selectedValues.map((value) => value.label).join(', ')
              : 'Select...'}
          </div>
          <div className='ml-2'>{isOpen ? '▲' : '▼'}</div>
        </div>
        {isOpen && (
          <div className='absolute z-10 mt-2 w-full rounded border bg-white shadow-lg'>
            <input
              type='text'
              value={filter}
              onChange={handleFilterChange}
              className='w-full rounded-t border-b px-3 py-2 focus:outline-none'
              placeholder='Filter options...'
            />
            <ul className='max-h-60 overflow-y-auto'>
              {options
                .filter((option) =>
                  option.label.toLowerCase().includes(filter.toLowerCase())
                )
                .map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-200 ${
                      selectedValues.find(
                        (value) => value.value === option.value
                      ) && 'bg-gray-300'
                    }`}
                  >
                    {option.label}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
