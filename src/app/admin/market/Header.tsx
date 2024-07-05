import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import Container from './Container'
import { FOOTER_MARKETPLACE } from '../consts'

export default function Header() {
  const ref = useRef(null)
  const [isSticked, setIsSticked] = useState(false)

  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(([e]) => setIsSticked(e.intersectionRatio < 1), {
        threshold: [1],
      })
    if (cachedRef) observer.observe(cachedRef)
    return () => {
      if (cachedRef) observer.unobserve(cachedRef)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky -top-[0.1px] z-50 transition-colors duration-150',
        isSticked ? 'border-b bg-white text-black' : 'text-white'
      )}
      ref={ref}
    >
      <Container>
        <div className="flex h-[4.25rem] items-center gap-x-2 py-2.5">
          <button className="h-full px-1 xl:hidden">
            <Bars3Icon className="h-8 w-8" />
          </button>
          <ul
            className={clsx(
              'ml-auto hidden gap-x-6 border-l pl-6 font-semibold xl:flex justify-center',
              isSticked ? 'border-slate-200' : 'border-white/20'
            )}
          >
            {FOOTER_MARKETPLACE.map((item, index) => (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
          <div className="relative ml-6 hidden h-full flex-1 sm:block">
            <MagnifyingGlassIcon
              className={clsx('absolute inset-y-0 left-3 z-10 my-auto h-5 w-5 stroke-2', isSticked && 'text-slate-500')}
            />
            <input
              name="Search"
              type="text"
              className={clsx(
                'h-full w-full rounded-xl border bg-white/10 pl-10 hover:bg-white/20 focus:ring-0',
                isSticked
                  ? 'border-slate-200 focus:border-slate-200'
                  : 'border-transparent placeholder:text-slate-200 focus:border-transparent'
              )}
              placeholder="Search items, collections, and accounts"
            />
          </div>
        </div>
      </Container>
    </header>
  )
}
