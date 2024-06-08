'use client';

import Image from 'next/image';
import HeroImage from '@/assets/homepage/hero-image.jpeg';
import IntroImage from '@/assets/homepage/intro-image.jpeg';
import DealImage from '@/assets/homepage/deal.jpeg';
import MasterpieceImage from '@/assets/homepage/masterpiece.jpeg';
import VisionImage from '@/assets/homepage/vision.jpeg';
import ElevateImage from '@/assets/homepage/elevate.jpeg';
import CollaborateImage from '@/assets/homepage/collaborate.jpeg';

export default function Home() {
  return (
    <main>
      {/* Hero section */}
      <div className='mx-auto mt-16 flex max-w-3xl flex-col items-center md:flex-row'>
        <div className='text-center md:mr-4 md:w-1/2 md:text-left'>
          <h2 className='text-4xl font-bold leading-12 text-white'>
            Write your story.
            <br />
            Find your audience.
            <br />
            MAKE IT HAPPEN.
          </h2>
          <button className='mt-8 rounded bg-blue-500 px-8 py-4 font-bold text-white hover:bg-blue-700'>
            Sign up
          </button>
        </div>
        <div className='mt-4 hidden md:mt-0 md:block md:w-1/2'>
          <Image src={HeroImage} alt='Hero image' width={400} height={400} />
        </div>
      </div>

      {/* hiropitch intro section */}
      <div className='container mx-auto mt-32 px-8 text-center'>
        <h4 className='text-bold text-6xl text-white'>hiropitch?</h4>
        <p className='mt-8 text-white'>
          We know how hard is to find the right audience for your idea. <br />
          No matter if you are a TV author, a screenplayer, a game designer or a
          professional in the media industry,
        </p>
        <Image
          src={IntroImage}
          alt='Intro image'
          className='mx-auto my-8 md:my-16'
          width={400}
          height={400}
        />
        <p className='text-white'>
          hiropitch is a decentralized autonomous organization (DAO) that will
          help you find the audience and the right producer for your project.
        </p>
      </div>

      {/* How it works? */}
      <div className='container mx-auto mt-32 px-8 text-center'>
        <h4 className='mx-auto text-4xl text-white'>But, how it works?</h4>
        <p className='my-16 text-white'>
          hiropitch is a community, but with the benefits of the company
          mindset:
        </p>
        <div className='mx-auto grid max-w-2xl gap-8 text-left md:grid-cols-2'>
          {/* Block 1 */}
          <div className='rounded-md bg-blue-800 px-4 py-8 text-white'>
            <Image
              src={VisionImage}
              alt='Ignite Your Vision'
              className='mb-4 h-auto w-full'
              width={400}
              height={400}
            />
            <h6 className='text-xl font-bold'>Ignite Your Vision</h6>
            <p className='mt-2 text-sm'>
              Whether it's a groundbreaking movie, a binge-worthy TV show, or an
              immersive game, begin by crafting your unique idea.
            </p>
          </div>

          {/* Block 2 */}
          <div className='rounded-md bg-blue-800 px-4 py-8 text-white'>
            <Image
              src={MasterpieceImage}
              alt='Ignite Your Vision'
              className='mb-4 h-auto w-full'
              width={400}
              height={400}
            />
            <h5 className='text-xl font-bold'>Craft Your Masterpiece</h5>
            <p className='mt-2 text-sm'>
              Focus on meticulous planning, from engaging video content and
              vivid storyboards to interactive demos. Display the potential of
              your innovative idea through dynamic and captivating preparation
              methods.
            </p>
          </div>

          {/* Block 3 */}
          <div className='rounded-md bg-blue-800 px-4 py-8 text-white'>
            <Image
              src={ElevateImage}
              alt='Ignite Your Vision'
              className='mb-4 h-auto w-full'
              width={400}
              height={400}
            />
            <h5 className='text-xl font-bold'>
              Elevate your pitch & rise to the Top
            </h5>
            <p className='mt-2 text-sm'>
              Leverage a blockchain-based voting platform to elevate your
              project. Engage a community that can propel your idea, gaining the
              attention of top industry professionals and producers effectively.
            </p>
          </div>

          {/* Block 4 */}
          <div className='rounded-md bg-blue-800 px-4 py-8 text-white'>
            <Image
              src={CollaborateImage}
              alt='Ignite Your Vision'
              className='mb-4 h-auto w-full'
              width={400}
              height={400}
            />
            <h5 className='text-xl font-bold'>Collaborate and Flourish</h5>
            <p className='mt-2 text-sm'>
              Collaborate closely with industry experts to polish your project.
              Discuss storytelling nuances, artistic direction, and rights
              sharing, utilizing blockchain to distribute rights among
              like-minded professionals.
            </p>
          </div>

          {/* Block 5 */}
          <div className='rounded-md bg-blue-800 px-4 py-8 text-white'>
            <Image
              src={DealImage}
              alt='Ignite Your Vision'
              className='mb-4 h-auto w-full'
              width={400}
              height={400}
            />
            <h5 className='text-xl font-bold'>Seal the deal</h5>
            <p className='mt-2 text-sm'>
              Engage in negotiations with producers to ensure your creative
              vision remains intact and their interests are also considered. Our
              approach prioritizes the rights and interests of authors and
              creators first.
            </p>
          </div>
        </div>
      </div>

      {/* Closing call */}
      <div className='container mx-auto my-16 text-center'>
        <h6 className='text-4xl leading-10 text-white md:text-6xl md:leading-16'>
          Bring your vision to life <br /> and change visual culture
        </h6>
        <button className='mt-8 rounded bg-blue-500 px-8 py-4 font-bold text-white hover:bg-blue-700'>
          Sign up
        </button>
      </div>
    </main>
  );
}
