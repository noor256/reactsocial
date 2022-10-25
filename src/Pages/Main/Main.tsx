
import {getDocs, collection, doc} from 'firebase/firestore'
import {db} from '../../config/firebase'
import { useEffect, useState } from 'react';
import { Post } from './post';


export interface Post{
    id: string,
    userId: string,
    title: string,
    description:string,
    username: string
}
export const Main = () =>{

    const [postsList, setPostList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts")

    const getPosts = async()=>{
     const data = await getDocs(postsRef)
     setPostList(data.docs.map((doc)=>({...doc.data(), id:doc.id})) as Post[])
    }

       useEffect(()=>{
           getPosts();
       }, [])

    return <div className="home_container">
     {postsList?.map((post,key)=> <Post post={post}/> )}
        
       </div>
}