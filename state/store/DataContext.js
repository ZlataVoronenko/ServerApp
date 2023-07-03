import { createContext, useMemo } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children, serverData }) => {
    const memoizedData = useMemo(() => serverData, [serverData]);

    return (
        <DataContext.Provider value={memoizedData}>
            {children}
        </DataContext.Provider>
    );
};
