import { useEffect, useRef, useState } from 'react';
import Container from './Container';
import { MAIN_TABS } from '../../app/admin/consts';

export default function Header() {
  const ref = useRef(null);
  const [isSticked, setIsSticked] = useState(false);

  useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticked(entry.intersectionRatio < 1);
      },
      {
        threshold: [1],
      }
    );
    if (cachedRef) observer.observe(cachedRef);
    return () => {
      if (cachedRef) observer.unobserve(cachedRef);
    };
  }, []);

  const handleItemClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    if (index === 0) {
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to corresponding section
      const id = MAIN_TABS[index].toLowerCase().replace(/\s/g, '-');
      const element = document.getElementById(id);
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const offsetTop = window.scrollY + elementTop;
        const currentScroll = window.scrollY;

        // Only scroll if the element is not already in view
        if (currentScroll !== offsetTop) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-10 border-b bg-white text-black transition-colors duration-150 ${
        isSticked ? 'shadow-md' : ''
      }`}
      ref={ref}
    >
      <Container>
        <div className='flex h-16 items-center justify-center gap-x-2 py-2.5'>
          <ul className='flex gap-x-6 font-semibold'>
            {MAIN_TABS.map((item, index) => (
              <li
                key={item}
                className='cursor-pointer rounded px-2 py-1 hover:bg-gray-200'
              >
                <a href='' title='' onClick={(e) => handleItemClick(e, index)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </header>
  );
}
