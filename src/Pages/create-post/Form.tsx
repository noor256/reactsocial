import { useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from 'firebase/firestore'
import {db, auth} from '../../config/firebase'
import { useAuthState} from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
interface CreateFormData{
   title:string;
   description: string;
}

function Form(){
    const navigate= useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("Add post is required")
        
    })

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db,"posts");
     const [user] = useAuthState(auth);
    const OnAddPost = async (data: CreateFormData) =>{
        
        console.log(data)
     await addDoc(postsRef, {
        ...data,
        username:user?.displayName,
        userId: user?.uid

     })
     navigate('/')

    }
   return (
       <form className="form_container" onSubmit={handleSubmit(OnAddPost)} >
        <input className="form_title" placeholder="Title...." {...register("title")}/>
        <p style={{color:'red'}}>{errors.title?.message}</p>
        <textarea  placeholder="Remember, Be cool!..." {...register('description')} style={{width:'100', height:'50', border:'none', marginTop:'-50px'}}/>
         <p style={{color:"red"}}>{errors.description?.message}</p>
         <input className="form_submit" type='submit'/>
            
       </form>

   )

}

export default Form;