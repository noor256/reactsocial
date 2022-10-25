
import {Link} from 'react-router-dom'
import { auth} from '../config/firebase';
import { useAuthState} from 'react-firebase-hooks/auth'
import { signOut} from 'firebase/auth'

export const Navbar = () => {

    const [user] = useAuthState(auth)

    const signUserOut =async () => {
        await signOut(auth);
        
    }
    return (
    <div className='navbar'> 
   
    <Link to='/' className='brand' >DialloTech</Link>
    <div className='link_container'>
    <Link to='/' className='link'>   <i className="fa fa-home" aria-hidden="true"></i> HOME</Link>
      {!user &&<Link to="/login" className='link'> <i className="fa fa-sign-in" aria-hidden="true"></i> LOGIN</Link>}
      <Link to='/create' className='link'> <i className="fa fa-arrow-down" aria-hidden="true"></i> ADD POST</Link>
      </div>
      <div className='authentication'>
        { user && (
            <>
        <p className='name'>{user?.displayName}</p>
        <img className='profile' src={user?.photoURL || ''}  alt=''/>
         <button className="logout_button" onClick={signUserOut}>LOG OUT</button>
         </>
        )
        }
      </div>
    </div>
    
    )
}