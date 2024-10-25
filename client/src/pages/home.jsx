import { verifyTokenReq } from '../api/admin'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const Home = ( ) =>{
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkToken = () => {
            const token = Cookies.get('token');
            if (token) {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                const userId = decodedPayload.id;
                fetchUser(userId);
            }

          
        };

        const fetchUser = async (userId) => {
            try {
                const res = await verifyTokenReq(userId);
                setUsername(res.data.username);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };

        checkToken();
    }, []);


    return (<>

        <h1>bienvenido a home </h1>
    </>)
}