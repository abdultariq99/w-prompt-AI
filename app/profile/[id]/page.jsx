'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Profile } from "@components/Profile"

export default function MyProfile () {
    const [posts, setPosts] = useState([]);
    const queryParams = useSearchParams();
    const dynamicParams = useParams();

    useEffect(()=>{
      const fetchPosts = async () =>{
          const response = await fetch(`/api/users/${dynamicParams.id}/posts`);
          const data = await response.json()
          setPosts(data);
        }  
            fetchPosts()
        }, [])

    const currentUser = queryParams.get('name')

  return (
      <Profile
      name={`${currentUser}'s`}
      desc={`Welcome to ${currentUser}'s Profile`}
      data={posts}
      />
    )
}
