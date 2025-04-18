import { createContext, useEffect, useReducer } from "react";

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
        case 'saveRecipe':
            return state.map(el => {
                if(el.id === action.id){
                  return {
                    ...el,
                    saved: !el.saved
                  }
                }else { return el }
              })
        // default:
        //     console.error(`No such type ${action.type}`);
        //     return state;
    }
}

const RecipesContext = createContext<undefined | RecipesContextTypes>(undefined);
const RecipesProvider = ({ children }: ChildrenProp) => {

    const [recipes, dispatch] = useReducer(reducer,[]);
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

    const saveOneRecipe = (id: Recipe['id']) => {
        const recipe = recipes.find(recipe => recipe.id === id); 
        if (!recipe) return;

        fetch(`http://localhost:8080/recipes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({saved: !recipe.saved})
        });
        dispatch({
            type:'saveRecipe',
            id
        });
    }

    const findRecipe = (id: Recipe['id']): Recipe | string => {
        const foundRecipe = recipes.find(recipe => recipe.id === id);
        if(foundRecipe){
            return foundRecipe;
        } else{
            return 'Error: recipe not found';
        }
    }

    useEffect(() => {
        fetch(`http://localhost:8080/recipes`)
        .then(res => res.json())
        .then((data: Recipe[]) => dispatch({
            type:'setData',
            data
        }));
    }, []);

    return(
        <RecipesContext.Provider
            value={{ 
                recipes,
                dispatch,
                addNewRecipe,
                removeOneRecipe,
                saveOneRecipe,
                findRecipe
            }}
        >
            { children }
        </RecipesContext.Provider>
    )
}

export {RecipesProvider};
export default RecipesContext;

