import { linkWithRedirect } from 'firebase/auth'
import { addDoc,collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import { auth, db } from '../../config/firebase'
import {Post as IPost} from './Main'
interface Props {
    post : IPost
}
 interface Like {
    likeId: string
    userId: string
}
export const Post =(props:Props)=>{
    const {post} = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes]= useState<Like[] | null>(null)

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes= async() =>{
       const data= await getDocs(likesDoc)
     setLikes(data.docs.map((doc, key) =>({userId:doc.data().userId, likeId:doc.id})))
    }

    useEffect(()=>{
        getLikes()
    }, [])
    const addLike =async () => {
        try{

       const newDoc=  await addDoc(likesRef, {userId:user?.uid , postId: post.id});
   
             if(user){
            setLikes((prev) =>
             prev ? [...prev, {userId: user.uid, likeId: newDoc.id}]: [{userId: user?.uid, likeId:newDoc.id}])  
   
              }
        }

        catch(err){
            console.log(err)
        }
    }

    const removeLike =async () => {
        try{
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id),where("userId", "==", user?.uid))

             const likeToDeleteData = await getDocs(likeToDeleteQuery)
             const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete= doc(db,'likes', likeId)

            await deleteDoc(likeToDelete);
   
             if(user){
            setLikes((prev) =>prev && prev.filter((like)=>like.likeId !==likeId) ) 
   
              }
        }

        catch(err){
            console.log(err)
        }
    }



  const hasUserLiked = likes?.find((like)=> like.userId ===user?.uid)


    return (
        <div className='post_box'>
             <div className='title'>
                <h1>{post.title}</h1>
                </div>
                <div className='desc_body'>
                    <p>{post.description}</p>
                </div>

                <div className='footer'>
                    <hr/>
                     <p className='username'>By:{post.username}</p>
                     <button  className='like_btn' onClick={hasUserLiked?removeLike : addLike}> {hasUserLiked? <>&#128078;</>: <>&#128077;</>}</button>
                 {likes && <p className='like_parag'>Likes: {likes?.length}</p>}
                </div>
        </div>
    )
}