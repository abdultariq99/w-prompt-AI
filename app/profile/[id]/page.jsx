'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { Profile } from "@components/Profile"

export default function MyProfile () {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("")
    const router = useRouter();
    const params = useParams();

    useEffect(()=>{
      const fetchPosts = async () =>{
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json()
          const obj = data[0]
          setUserName(obj.creator.username)
          setPosts(data);
        }  
            fetchPosts()
        }, [])

    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) =>{
      console.log(posts)
      const hasConfirmed = confirm("Are you sure you want to delete this prompt");
      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${post._id}`, {
            method: 'DELETE'
          })
          const filteredPosts = posts.filter((p)=> p._id !== post._id);
          setPosts(filteredPosts)
        } catch(error){
          console.log(error)
        }
      }
    }
  return (
      <Profile
      name={`${userName}'s`}
      desc={`Welcome to ${userName}'s profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    )
}
