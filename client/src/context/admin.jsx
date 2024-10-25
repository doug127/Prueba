import { useContext, createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import { loginReq } from "../api/admin"
import { verifyTokenReq } from "../api/admin"


const AuthContext = createContext();

export const Auth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('el Auth deberia estar dentro de un provider')
    return context;
}

export const AdminProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //validar datos de inicio de sesión
    const signin = async (user) => {
        setLoading(true);
        try {
            const res = await loginReq(user);      
            if(res){
                setUser(res.data.user);
                setIsAuth(true);
                setErrors([]);
                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response.data || error.message);
            setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message]);
        }
    };       

    //useEffect gestiona la autenticación del usuario al momento de cargar el componente
    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true);
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuth(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenReq();
                if (res.data) {
                    setIsAuth(true);
                    setUser(res.data);
                } else {
                    setIsAuth(false);
                    setUser(null);
                }
            } catch (error) {
                setIsAuth(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);


    return(
        <AuthContext.Provider value={ { signin, user, isAuth, errors, loading } }>
            {children}
        </AuthContext.Provider>
    )
}   