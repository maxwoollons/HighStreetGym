import React from "react";
import { useContext } from React

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        axios
        .get("/api/users/loginstatus")
        .then((res) => {
            if (res.data) {
            setUser(res.data);
            console.log(res.data);
            } else {
            setUser(null);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <AppContext.Provider value={{ user, setUser }}>
        {children}
        </AppContext.Provider>
    );
    }
    