import { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null); // To store user data
    const [loading, setLoading] = useState(true); // To handle loading state

    // console.log('user', user)

    const fetchUser = async () => {
        setLoading(true); // Set loading to true at the start of fetching
        try {
            const token = localStorage.getItem('token');
            // console.log('token', token)
            if (token) {
                const response = await axios.get('http://localhost:5000/api/user/whoami', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setUser(response.data); // Set the user data from the response
            }
            else {
                setUser(null)
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setUser(null);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}    