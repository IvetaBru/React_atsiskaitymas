import { createContext, useEffect, useReducer, useState } from "react";

import { Recipe, ChildrenProp, ActionTypes, RecipesContextTypes } from "../../types";
import { useNavigate } from "react-router";

const reducer = (state: Recipe[], action: ActionTypes) => {
    switch(action.type){
        case 'setData':
            return action.data;
        case 'addRecipe':
            return [...state, action.newRecipe];
        case 'deleteRecipe':
            return state.filter(recipe => recipe.id !== action.id);
        default:
            console.error(`No such type ${action.type}`);
            return state;
    }
}

const RecipesContext = createContext<undefined | RecipesContextTypes>(undefined);
const RecipesProvider = ({ children }: ChildrenProp) => {

    const [recipes, dispatch] = useReducer(reducer,[]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const addNewRecipe = (newRecipe: Recipe) => {
        fetch(`http://localhost:8080/recipes`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newRecipe)
        });
        dispatch({
            type: 'addRecipe',
            newRecipe
        });
    }

    const removeOneRecipe = (id: Recipe['id']) => {
        const confirm = window.confirm("Do you want to delete it?");
        if (!confirm) return;

        fetch(`http://localhost:8080/recipes/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            dispatch({
                type: 'deleteRecipe',
                id
            });
            navigate('/')
        })
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8080/recipes`)
            .then(res => res.json())
            .then((data: Recipe[]) => {
                dispatch({
                    type: 'setData',
                    data
                });
                setIsLoading(false); 
            });
    }, []);

    return(
        <RecipesContext.Provider
            value={{ 
                recipes,
                dispatch,
                isLoading,
                addNewRecipe,
                removeOneRecipe,
            }}
        >
            { children }
        </RecipesContext.Provider>
    )
}

export {RecipesProvider};
export default RecipesContext;

