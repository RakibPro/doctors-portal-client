import { useEffect, useState } from 'react';

const useToken = (email) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const url = `http://localhost:5000/jwt?email=${email}`;
        if (email) {
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                    }
                });
        }
    }, [email]);
    return [token];
};
export default useToken;
