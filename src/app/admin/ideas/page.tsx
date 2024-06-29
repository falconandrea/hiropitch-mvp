'use client';

import React, { useState } from 'react';

export default function Ideas() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    contractType: string;
    author: string;
    authors: string[];
    referenceLink: string;
    referenceLinks: string[];
    // Esplicitare il tipo di tutti i campi dell'oggetto 'formData' mi e' servito per inserire degli autori di tipo string, altrimenti ricevevo errore "Type 'string' is not assignable to type 'never'."
  }>({
    title: '', // Campo per l'input del titolo
    description: '', // Campo per l'input della descrizione
    category: 'FUMETTI', // scelta default, giusto per capire cosa trovarci dentro
    contractType: 'PRE-ACQUISTO', // scelta default, giusto per capire cosa trovarci dentro
    author: '', // Campo per l'input dell'autore
    authors: [], // Lista degli autori
    referenceLink: '', // Campo per l'input del link
    referenceLinks: [], // Lista dei link
  });

  // Funzione per cambiare i valori del form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funzione per aggiungere un autore/autori
  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.author.trim() !== '') {
      setFormData({
        ...formData,
        authors: [...formData.authors, formData.author],
        author: '',
      });
    }
  };

  //Funzione per inviare il form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form data submitted:', formData);
  };

  return (
    /* FORM CREATION */

    /* IP NAME */
    <div className='mx-auto max-w-lg'>
      <h1 className='mb-5 text-center text-5xl font-bold'>IDEAS</h1>
      <h2 className='w full mb-3 text-center font-sans text-2xl'>
        Your ideas are safely saved in our database. Share it to our community
        and find your crewmate now!
      </h2>
      <form
        onSubmit={handleSubmit}
        className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'
      >
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='title'
          >
            IP NAME
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Give a name to your idea here!' // Placeholder per guidare l'utente
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
          />
        </div>

        {/* IP CATEGORYTYPE */}
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='category'
          >
            IP CATEGORY TYPE
          </label>
          <select
            id='category'
            name='category'
            value={formData.category}
            onChange={handleChange}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
          >
            <option value='FUMETTI'>FUMETTI</option>
            <option value='TRATTAMENTO'>TRATTAMENTO</option>
            <option value='LIBRI'>LIBRI</option>
            <option value='SCENEGGIATURA'>SCENEGGIATURA</option>
            <option value='SINOSSI'>SINOSSI</option>
            <option value='SCRIPT TELEVISIVO'>SCRIPT TELEVISIVO</option>
            <option value='SOGGETTO'>SOGGETTO</option>
            <option value='VIDEOGAME STORY'>VIDEOGAME STORY</option>
            <option value='VIDEOGAME MVP'>VIDEOGAME MVP</option>
          </select>
        </div>

        {/* IP DESCRIPTION */}
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='description'
          >
            IP DESCRIPTION
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Give hype to your idea here! What is it about?' // Placeholder per guidare l'utente
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
          ></textarea>
        </div>

        {/* IP REFERENCE LINKS */}
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='referenceLinks'
          >
            IP REFERENCE LINKS
          </label>
          <input
            type='text'
            id='referenceLinks'
            name='referenceLinks'
            value={formData.referenceLinks}
            onChange={handleChange}
            placeholder='Enter your reference links here!'
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
          />
        </div>

        {/* CONTRACT TYPE */}
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='contractType'
          >
            CONTRCT TYPE
          </label>
          <select
            id='contractType'
            name='contractType'
            value={formData.contractType}
            onChange={handleChange}
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
          >
            <option value='PRE-ACQUISTO'>PRE-ACQUISTO</option>
            <option value='OPZIONE'>OPZIONE</option>
            <option value='APPALTO-PRODUZIONE-COMMISSIONE'>
              APPALTO-PRODUZIONE-COMMISSIONE
            </option>
            <option value='ACQUISTO TOTALE DEI DIRITTI PATRIMONIALI'>
              ACQUISTO TOTALE DEI DIRITTI PATRIMONIALI
            </option>
            <option value='DISTRIBUZIONE'>DISTRIBUZIONE</option>
            <option value='ACQUISTO parziale DEI DIRITTI PATRIMONIALI'>
              ACQUISTO parziale DEI DIRITTI PATRIMONIALI
            </option>
            <option value='COPRODUZIONE'>COPRODUZIONE</option>
            <option value='LICENZA'>LICENZA</option>
          </select>
        </div>

        {/* IP AUTHOR */}
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='author'
          >
            ID AUTHOR (discutere su come implementarlo)
          </label>
          <div className='flex'>
            <input
              type='text'
              id='author'
              name='author'
              value={formData.author}
              onChange={handleChange}
              placeholder='It could be more than one author' // Placeholder per guidare l'utente
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            />
            <button
              onClick={handleAddAuthor}
              className='focus:shadow-outline ml-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none'
            >
              Add
            </button>
          </div>
          <ul className='mt-4'>
            {formData.authors.map((author, index) => (
              <li key={index} className='mt-2 rounded bg-gray-200 p-2'>
                {author}
              </li>
            ))}
          </ul>
        </div>

        {/* SUBMIT BUTTON */}
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
