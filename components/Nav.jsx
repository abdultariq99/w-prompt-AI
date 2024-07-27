'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export const Nav = () => {
 const { data: session } = useSession;
 const [providers, setProviders] = useState(null);
 const [toggleDropDown, setToggleDropDown] = useState(false)

 useEffect(()=>{
  const setUpProviders = async () =>{
    const response = await getProviders();
    setProviders(response);
  }

  setUpProviders()
 }, []);

  return (
    <nav className='flex-between w-full mb-16 mt-4'>
      <Link href='/' className='flex gap-2 flex-center'>
      <Image src='/assets/images/logo.svg' width={30} height={30} />
      <p className='logo_text'>W Prompts</p>
      </Link>

      {/* Windows Navigation*/}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>Create Post</Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href='/profile'>
            <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile'/>
            </Link>
          </div>
        ) : (
          <>
          {providers &&
          Object.values(providers).map((provider)=>(
            <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn'>
              Sign In
            </button>
          ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image src='/assets/images/logo.svg' width={37} height={37} className='rounded-full' alt='profile'
            onClick={()=>setToggleDropDown((prev)=> !prev)}
            />
            {toggleDropDown && (
              <div className='dropdown flex-center'>
                <Link 
                href='/profile'
                className='dropdown_link'
                onClick={()=> setToggleDropDown(false)}
                >
                My Profile
                </Link>

                <Link 
                href='/create-prompt'
                className='dropdown_link'
                onClick={()=> setToggleDropDown(false)}
                >
                Create Prompt
                </Link>

                <button type='button' onClick={()=> {setToggleDropDown(false); signOut();}} className='black_btn mt-2 w-full'>
                Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
          {providers &&
          Object.values(providers).map((provider)=>(
            <button type='button' key={provider.name} onClick={()=> signIn(provider.id)} className='black_btn'>
              Sign In
            </button>
          ))}
          </>
        )}
      </div>
    </nav>
  )
}
