import { createContext, useEffect, useState, useReducer} from "react";

import { ChildrenProp, Recipe, User, UserActionTypes, UsersContextTypes } from "../../types";

const reducer = (state: User[], action: UserActionTypes) => {
    switch(action.type){
        case 'setUsers':
          return action.data;
        case "addUser":
            return [...state, action.newUser];
        case 'saveRecipe':
            return state.map(el => {
                if(el.id === action.userId){
                    return{
                        ...el,
                        savedRecipes: [...el.savedRecipes, action.recipeId]
                    }
                } else {
                    return el;
                }
            });
        case 'unsaveRecipe':
            return state.map(el => {
                if(el.id === action.userId){
                    return {
                        ...el,
                        savedRecipes: el.savedRecipes.filter(rcpId => rcpId !== action.recipeId)
                    }
                }else{
                    return el;
                }
        });
    }
}

const UsersContext = createContext<undefined | UsersContextTypes>(undefined);
const UsersProvider = ({ children }:ChildrenProp) => {

    const [users, dispatch] = useReducer(reducer, []);
    const [loggedInUser, setLoggedInUser] = useState<null | User>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/users`)
        .then(res => res.json())
        .then(data => dispatch ({
            type: 'setUsers',
            data
        }))
    }, []);

    const addNewUser = (newUser: User) => {
        fetch(`http://localhost:8080/users`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser)
        });
        dispatch({
            type: 'addUser',
            newUser
        });
    }

    const savedRecipes = (id: Recipe['id']) => {
        if(loggedInUser){
            const updatedSaved = Array.from(new Set([...loggedInUser.savedRecipes, id]));
            setLoggedInUser({
                ...loggedInUser,
                savedRecipes: updatedSaved
            });
            dispatch({
                type:'saveRecipe',
                recipeId: id,
                userId: loggedInUser.id
            });
            fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ savedRecipes: updatedSaved })
            })
        }
    }

    const unsavedRecipes = (id: Recipe['id']) => {
        if(loggedInUser){
            const updatedSaved = loggedInUser.savedRecipes.filter(rcpId => rcpId !== id);
            setLoggedInUser({
                ...loggedInUser,
                savedRecipes: updatedSaved
            });
            dispatch({
                type:'unsaveRecipe',
                recipeId: id,
                userId: loggedInUser.id
            });
            fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ savedRecipes: updatedSaved })
            })
        }
    }
    return(
        <UsersContext.Provider
            value={{
                users,
                dispatch,
                loggedInUser,
                setLoggedInUser,
                addNewUser,
                savedRecipes,
                unsavedRecipes
            }}
        >
            { children }
        </UsersContext.Provider>
    )
}

export { UsersProvider };
export default UsersContext;