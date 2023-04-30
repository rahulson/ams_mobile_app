import React, { useContext } from 'react'
import { getReducer } from '../store/UserReducer'

const UserContext = React.createContext(null)

const UserProvider = (props) => {

    const  [state, dispatch] = getReducer()

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>    
    )
}

export const useAppContext = () => useContext(UserContext)

export default UserProvider