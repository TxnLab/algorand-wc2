import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home</span>
            <Image
              className="h-8 w-auto invert"
              src="https://tailwindui.com/img/logos/mark.svg"
              alt=""
              width={32}
              height={32}
            />
          </a>
        </div>
      </nav>
    </header>
  )
}
