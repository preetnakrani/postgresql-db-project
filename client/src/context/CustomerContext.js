import React, {useState, createContext} from "react";

export const CustomerContext = createContext();

export const CustomerContextProvider = (props) => {
    const [customers, setCustomers] = useState([]);

    return (
        <CustomerContext.Provider value={{customers, setCustomers}}>
            {props.children};
        </CustomerContext.Provider>
    );
};