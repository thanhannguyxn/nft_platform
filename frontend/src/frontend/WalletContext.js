// WalletContext.js
//This file handling the wallet transaction
import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState('0');
    const [account, setAccount] = useState('');

    //This function gets the balance off the account
    const updateBalance = (newBalance) => {
        setBalance(newBalance);
    };

    return (
        <WalletContext.Provider value={{ balance, account, setAccount, setBalance, updateBalance }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};