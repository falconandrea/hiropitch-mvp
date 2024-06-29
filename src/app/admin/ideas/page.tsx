'use client';

import SelectInput from '@/components/inputs/SelectInput';
import MultiSelect from '@/components/inputs/MultiSelect';
import TextInput from '@/components/inputs/TextInput';
import TextareaInput from '@/components/inputs/TextareaInput';
import React, { useEffect, useState } from 'react';

import { IPContractTypes, IPCategories } from '@/lib/constants';
import MultipleTexts from '@/components/inputs/MultipleTexts';

type User = { id: string; name: string };

export default function Ideas() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    contractType: string;
    authors: { value: string; label: string }[];
    referenceLink: string;
    referenceLinks: string[];
  }>({
    title: '',
    description: '',
    category: '',
    contractType: '',
    authors: [],
    referenceLink: '',
    referenceLinks: [],
  });

  /* For MultipleTexts */
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddReferenceLink = () => {
    if (inputValue.trim() !== '') {
      setFormData({
        ...formData,
        referenceLinks: [...formData.referenceLinks, inputValue],
      });
      setInputValue('');
    }
  };
  const handleRemoveReferenceLink = (index: number) => {
    const updatedLinks = [...formData.referenceLinks];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, referenceLinks: updatedLinks });
  };

  /* For MultiSelect */
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        const userOptions = data.map(
          (user: { _id: string; firstName: string; lastName: string }) => ({
            value: user._id,
            label: `${user.firstName} ${user.lastName}`,
          })
        );
        setUsers(userOptions);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleMultiSelectChange = (
    selectedValues: { value: string; label: string }[]
  ) => {
    setFormData({ ...formData, authors: selectedValues });
  };

  /* General form handling */
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* Submit form */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='max-w-2lg mx-auto'>
      <h1 className='mb-2 text-center text-4xl font-bold'>IDEAS</h1>
      <h2 className='w full mb-3 text-center font-sans text-xl'>
        Your ideas are safely saved in our database. Share it to our community
        and find your crewmate now!
      </h2>
      <form className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'>
        <div className='flex flex-col xl:flex-row xl:gap-x-4'>
          {/* Column Left */}
          <div className='w-full xl:w-1/2'>
            <TextInput
              label='IP name'
              name='title'
              value={formData.title}
              onChange={handleFormChange}
              placeholder='Give a name to your idea here!'
            />

            <SelectInput
              label='IP category'
              name='category'
              onChange={handleFormChange}
              options={IPContractTypes.map((contractType) => ({
                value: contractType,
                label: contractType,
              }))}
              value={formData.category}
            />

            <SelectInput
              label='Contract Type'
              name='contractType'
              onChange={handleFormChange}
              options={IPCategories.map((category) => ({
                value: category,
                label: category,
              }))}
              value={formData.contractType}
            />

            <TextareaInput
              label='IP description'
              name='description'
              value={formData.description}
              onChange={handleFormChange}
              placeholder='Give hype to your idea here! What is it about?'
            />
          </div>

          {/* Column Right */}
          <div className='w-full xl:w-1/2'>
            <MultipleTexts
              label='IP reference links'
              name='referenceLink'
              onChange={handleChange}
              inputValue={inputValue}
              values={formData.referenceLinks}
              onAddValue={handleAddReferenceLink}
              onRemoveValue={handleRemoveReferenceLink}
              placeholder='Enter your reference links here!'
            />

            <MultiSelect
              label='Authors'
              options={users}
              selectedValues={formData.authors}
              onChange={handleMultiSelectChange}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
