import { useContext } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as generateID } from 'uuid';
import styled from "styled-components";

import RecipesContext from "../contexts/RecipesContext";
import { Recipe, RecipesContextTypes, UsersContextTypes } from "../../types";
import UsersContext from "../contexts/UsersContext";

const StyledSection = styled.section`

`

const AddRecipe = () => {

    const { addNewRecipe } = useContext(RecipesContext) as RecipesContextTypes;
    const { loggedInUser} = useContext(UsersContext) as UsersContextTypes;
    const navigate = useNavigate();

    const initValues: Pick<Recipe, 'title' | 'description' | 'image'> = {
        title: '',
        description: '',
        image: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(50, 'Title is too long')
            .required('Field must be filled'),
        description: Yup.string()
            .min(20, 'Description is to short')
            .max(200, 'Description is too long')
            .required('Field must be filled'),
        image: Yup.string()
            .url('Please enter a valid image URL')
            .matches(/\.(jpeg|jpg|gif|png|webp)$/i, 'URL must end with an image extension (.jpg, .png, etc.)')
            .nullable()
    })

    const formik = useFormik({
        initialValues: initValues,
        validationSchema,
        onSubmit: (values) => {
            if (!loggedInUser) return;
        
            const newRecipe: Recipe = {
                id: generateID(),
                title: values.title,
                description: values.description,
                image: values.image,
                createdAt: new Date().toISOString(),
                authorId: loggedInUser.id,
            }  
            addNewRecipe(newRecipe);
            navigate('/')
        }
    })

    return ( 
        <StyledSection>
            <h2>Add new recipe</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title" name="title"
                        placeholder="Enter recipe title"
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.title && formik.touched.title &&
                        <span>{formik.errors.title}</span>
                    }
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description" name="description"
                        placeholder="Enter recipe description"
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.description && formik.touched.description &&
                        <span>{formik.errors.description}</span>
                    }
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="url"
                        id="image" name="image"
                        placeholder="Add recipe image"
                        value={formik.values.image}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.image && formik.touched.image &&
                        <span>{formik.errors.image}</span>
                    }
                </div>
                <input type="submit" value="Add Recipe" className='button'/>
            </form>
        </StyledSection>
     );
}
 
export default AddRecipe;