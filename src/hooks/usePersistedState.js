import { useState } from 'react';

export default function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
        try {
            const persistedState = localStorage.getItem(key);
            return persistedState ? JSON.parse(persistedState) : defaultValue;
        } catch (error) {
            console.error('Error loading persisted state:', error);
            return defaultValue;
        }
    });

    const setPersistedState = (value) => {
        try {
            setState(value);

            let serializedValue;
            if (typeof value === 'function') {
                serializedValue = JSON.stringify(value(state));
            } else {
                serializedValue = JSON.stringify(value);
            }

            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error saving persisted state:', error);
        }
    };

    return [state, setPersistedState];
}