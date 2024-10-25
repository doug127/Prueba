import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from '../../context/admin';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
export const IsAdmin = ( ) =>{
    const { register, handleSubmit} = useForm();
    const { signin, isAuth, errors } = Auth();
    const [isErrors, setIsErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        const res = await signin(data);
        if (res) {
            setRedirect(true);
        }
    };

    useEffect(() => {
        if (isAuth || redirect) {
            navigate('/');
        }
    }, [isAuth, redirect, navigate]);

    useEffect(()=>{
        if(Array.isArray(errors) && errors.length > 0){
            setIsErrors(errors);
            const timer =  setTimeout(() => {
                setIsErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
},[errors])


    return (
        <div>
              <AnimatePresence>
                {isErrors.map((error, i) => (
                    <motion.div
                        className='bg-red-600 p-2 text-white my-2 max-w-60 m-auto'
                        key={i}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}>
                        {error}
                    </motion.div>
                ))}
            </AnimatePresence>
            
            <form  onSubmit={handleSubmit(handleLogin)}>
                <input type="text" {...register('dni', { required: true })} />
                <input type="password"  {...register('password', { required: true })}/>
                <button type="submit">ingresar</button>
            </form>
        </div>
    )
}