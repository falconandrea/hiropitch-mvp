'use client';

import React from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='mt-16 p-8 text-center text-white md:text-left'>
      <div className='mx-auto flex flex-col md:flex-row md:justify-between'>
        <div className='mb-16'>
          <h4 className='text-lg font-bold'>hiropitch</h4>
          <p className='text-white'>make it happen.</p>
          <div className='mt-4 flex justify-center space-x-4 align-middle md:justify-start'>
            <a href='https://twitter.com' className='hover:text-blue-400'>
              <FaTwitter />
            </a>
            <a href='https://facebook.com' className='hover:text-blue-600'>
              <FaFacebookF />
            </a>
            <a href='https://linkedin.com' className='hover:text-blue-700'>
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div>
            <h5 className='font-semibold'>Products</h5>
            <ul className='mt-2'>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Marketing
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Sales solution
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Business
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Data
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className='font-semibold'>Support</h5>
            <ul className='mt-2'>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Documentation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  APIs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className='font-semibold'>Company</h5>
            <ul className='mt-2'>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  About
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Team
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Careers
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  News
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className='font-semibold'>Legal</h5>
            <ul className='mt-2'>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-300'>
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className='mb-8 mt-16 text-center text-white'>
        &copy; 2024 hiropitch. All rights reserved.
      </p>
    </footer>
  );
}
