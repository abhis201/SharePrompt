"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between sm:flex items-center w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 items-center sm:w-[30%] justify-start'>
        <Image
          src='/assets/icons/ai-logo.svg'
          alt='logo'
          width={40}
          height={40}
          className='object-contain'
        />
        <p className='logo_text'>SharePrompt</p>
      </Link>
      <div className="sm:flex hidden w-[40%] items-center justify-center overflow-x-scroll">
        <a target="_blank_" title="chatGPT" href="https://chat.openai.com/"><Image className="object-contain" src="assets/icons/chatgpt-icon.svg" alt='chatgpt' width={25} height={25} ></Image></a>
        <a target="_blank_" title="Gemini" href="https://gemini.google.com/"><Image className="ml-7 object-contain" src="assets/icons/google-gemini-icon.svg" alt='chatgpt' width={25} height={25} ></Image></a>
        <a target="_blank_" title="Copilot" href="https://copilot.microsoft.com/"><Image className="ml-7 object-contain" src="assets/icons/copilot-icon.svg" alt='chatgpt' width={25} height={25} ></Image></a>
        <a target="_blank_" title="Claude" href="https://claude.ai/"><Image className="ml-7 object-contain" src="assets/icons/claude-ai-icon.svg" alt='claudeai' width={20} height={25} ></Image></a>
      </div>
      {/* Desktop Navigation */}
      < div className='sm:flex hidden sm:w-[30%] items-center justify-end' >
        {
          session?.user ? (
            <div className='flex gap-3 md:gap-5' >
              <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>

              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
      </ div>

      {/* Mobile Navigation */}
      < div className='sm:hidden flex relative' >
        {
          session?.user ? (
            <div className='flex' >
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />

              {toggleDropdown && (
                <div className='dropdown'>
                  <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/create-prompt'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div >
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        <div className="ml-2 relative">
          <button
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <Image src="/assets/icons/close.svg" width={30} height={30} className="block h-6 w-6" />
            ) : (
              <Image src="/assets/icons/menu-icon.svg" width={30} height={30} className="block h-6 w-6" />
            )}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 py-1 bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <a href="https://chat.openai.com/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">ChatGPT</a>
              <a href="https://gemini.google.com/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">Google Gemini</a>
              <a href="https://copilot.microsoft.com/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">Microsoft Copilot</a>
              <a href="https://claude.ai/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" target="_blank" rel="noopener noreferrer">Claude AI</a>
            </div>
          )}
        </div>
      </div >
    </nav >
  );
};

export default Nav;
