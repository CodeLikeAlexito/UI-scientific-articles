import { useEffect, useState } from "react";

const useLocalState = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
        console.log(key);
        console.log(localStorage.getItem(key));
        const localStorageValue = localStorage.getItem(key);
        console.log(localStorage.getItem(key));

        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

export {useLocalState};