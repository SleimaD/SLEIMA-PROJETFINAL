"use client"
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, signUp, signOut, selectIsAuthenticated, authenticate } from '@/app/lib/features/login/loginSlice';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const Page = () => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggles between sign up and sign in forms
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
    const welcomeMessage = useSelector((state) => state.login.welcomeMessage);
    const [isPanelActive, setIsPanelActive] = useState(false); // Controls CSS for sliding panel effect
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const darkMode = useSelector((state) => state.theme.darkMode); // Accesses the darkMode state from the Redux store



    // useEffect for redirecting if authenticated
    useEffect(() => { 
        if (isAuthenticated) {
          router.push('/'); // onclick => redirected to home page
        }
    }, [isAuthenticated, welcomeMessage, router]);  


    // Function to toggle sign up panels
    const activateSignUp = () => {
        setIsPanelActive(true);
    };

    // Function to toggle sign in panels
    const activateSignIn = () => {
        setIsPanelActive(false);
    };




    // Form submission handlers 
    const handleSignUpSubmit = (e) => {
        e.preventDefault();  
        dispatch(signUp(name, email, password));
    };
    
    const handleSignInSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(email, password));
    };


    // Functions  calling 'authenticate' for login/signup 
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authenticate({ email, password }));
        router.push('/'); // Navigate to home Page
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        
        dispatch(authenticate({ email, password })); 
        router.push('/'); 
    };


    const toggleSignUp = () => setIsSignUp(true);      
    const toggleSignIn = () => setIsSignUp(false);


    // Dynamic CSS classes for the panel animation
    let containerClasses = "container mt-10 bg-white rounded-xl shadow-md shadow-[#858585] relative overflow-hidden w-[768px] max-[769px]:w-[750px] max-w-full min-h-[480px]";
    if (isPanelActive) {
        containerClasses += " right-panel-active";
    }


    return (
        <div className={` h-[92vh] ${darkMode ? 'bg-black ' : 'bg-white'}`}>
            <Navbar/>   
            <div className={`w-full h-full flex justify-center items-center p-5  ${darkMode ? 'bg-black' : 'bg-white '} `}>
            <div className={containerClasses} id="container">
                <div className="form-container sign-up-container absolute top-0 h-[100%] left-0 w-[50%] opacity-0 z-[1] ">
                    <form onSubmit={handleSignUp} className='h-full bg-white flex justify-center items-center flex-col text-center p-[50px] ' action="#">
                        <h1 className='font-bold m-0'>Create Account</h1>
                        <input className=' bg-[#eee] border-none p-[15px] max-[426px]:w-[180%] m-[8px] w-[100%] ' type="text" placeholder="Name" />
                        <input className=' bg-[#eee] border-none p-[15px] max-[426px]:w-[180%] m-[8px] w-[100%] ' type="email" placeholder="Email" />
                        <input className=' bg-[#eee] border-none p-[15px] max-[426px]:w-[180%] m-[8px] w-[100%] ' type="password" placeholder="Password" />
                        <button className='bouton signup border-white border-2'>Sign Up</button>
                    </form>     
                </div>
                <div className="form-container sign-in-container absolute top-0 h-[100%] left-0 w-[50%] z-[2] ">
                    <form onSubmit={handleLogin} className='h-full bg-white flex justify-center items-center flex-col text-center p-[50px] ' action="#">
                        <h1 className='font-bold m-0'>Sign in</h1>
                        <input className=' bg-[#eee] border-none p-[15px] max-[426px]:w-[180%] m-[8px] w-[100%] ' type="email" placeholder="Email" />
                        <input className=' bg-[#eee] border-none p-[15px] max-[426px]:w-[180%] m-[8px] w-[100%] ' type="password" placeholder="Password" />
                        <button className='bouton bg-black p-2 px-3 text-white rounded-full'>Sign In</button>
                    </form>
                </div>
                    <div className="overlay-container absolute top-0 left-[50%] w-[50%] h-[100%] overflow-hidden z-[100] ">
                        <div className="overlay bg-black text-white relative left-[-100%] h-[100%] w-[200%] ">
                            <div className="overlay-panel overlay-left flex flex-col justify-center items-center gap-5">
                                <h1>Welcome Back!</h1> 
                                <p className='max-[426px]:text-[0.9rem]'>To keep connected with us please login with your personal info</p>  
                                <button onClick={activateSignIn} className="ghost border-white p-2 px-3 rounded-full border-2" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right flex flex-col justify-center items-center gap-5">
                                <h1>Hello, Friend!</h1>
                                <p className='max-[426px]:text-[0.9rem]'>Enter your personal details and start journey with us</p>
                                <button onClick={activateSignUp}  className="ghost border-white border-2 p-2 px-3 rounded-full" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
            <Footer/>
        
        </div>         
    );}

export default Page