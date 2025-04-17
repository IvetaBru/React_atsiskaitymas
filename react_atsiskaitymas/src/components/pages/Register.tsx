import { useContext } from "react";
import { useNavigate, Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcryptjs';
import styled from 'styled-components';

import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes, User } from "../../types";

const StyledSection = styled.section`
    
`

const Register = () => {

    const { users, dispatch, addNewUser, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const navigate = useNavigate();

    type InitValues = Omit<User, 'id' | 'passwordText' | 'savedRecipes'> & { passwordRepeat: string };

    const initialValues: InitValues = {
        username: '',
        email: '',
        avatar: '',
        birthdate: '',
        password: '',
        passwordRepeat: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(5, 'Username too short')
            .max(20, 'Username too long')
            .required('Field must be filled'),
        email: Yup.string()
            .email('Enter a valid email')
            .required('Field must be filled'),
        avatar: Yup.string()
            .url('Please enter a valid image URL')
            .matches(/\.(jpeg|jpg|gif|png|webp)$/i, 'URL must end with an image extension (.jpg, .png, etc.)')
            .nullable(),
        birthdate: Yup.date()
            .min(new Date('1900-01-01'), 'Enter a valid birthdate')
            .max(new Date(new Date().setFullYear(new Date().getFullYear() - 16)), 'You must be at least 16 years old')
            .required('Birthdate is required'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
                'Password must include at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be 8–25 characters long.'
            )
            .required('This field is required.'),
        passwordRepeat: Yup.string()
            .oneOf([Yup.ref('password')], `Passwords don't match`)
            .required('Field must be filled'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const emailExists = users.some(user => user.email === values.email);
            const usernameExists = users.some(user => user.username === values.username);

            if(emailExists || usernameExists){
                formik.setErrors({
                    ...(emailExists ? { email: 'This email already ecists'} : {}),
                    ...(usernameExists ? { username: 'This username is already taken'} : {})
                });
                return;
            }
            const newUser: User = {
                id: generateID(),
                username: values.username,
                email: values.email,
                avatar: values.avatar,
                birthdate: values.birthdate,
                password: bcrypt.hashSync(values.password, 10),
                passwordText: values.password,
                savedRecipes: []
            };
            addNewUser(newUser);
            dispatch({ type: "addUser", newUser });
            setLoggedInUser(newUser);
            localStorage.setItem("loggedInUser", JSON.stringify(newUser));
            navigate("/");
        }
    })

    return ( 
        <StyledSection>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username" name="username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.username && formik.touched.username &&
                    <span>{formik.errors.username}</span>
                }
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email" name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.email && formik.touched.email &&
                    <span>{formik.errors.email}</span>
                }
                </div>
                <div>
                <label htmlFor="avatar">Avatar:</label>
                <input
                    type="url"
                    id="avatar" name="avatar"
                    placeholder="Add your avatar picture"
                    value={formik.values.avatar}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.avatar && formik.touched.avatar &&
                    <span>{formik.errors.avatar}</span>
                }
                </div>
                <div>
                <label htmlFor="birthdate">Birthdate:</label>
                <input
                    type="date"
                    id="birthdate" name="birthdate"
                    placeholder="Enter your birthdate"
                    value={formik.values.birthdate}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.birthdate && formik.touched.birthdate &&
                    <span>{formik.errors.birthdate}</span>
                }
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password" name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.password && formik.touched.password &&
                    <span>{formik.errors.password}</span>
                }
                </div>
                <div>
                <label htmlFor="passwordRepeat">Password repeat:</label>
                <input
                    type="password"
                    id="passwordRepeat" name="passwordRepeat"
                    placeholder="Enter your password"
                    value={formik.values.passwordRepeat}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {
                    formik.errors.passwordRepeat && formik.touched.passwordRepeat &&
                    <span>{formik.errors.passwordRepeat}</span>
                }
                </div>
                <input type="submit" value="Login" className='button'/>
            </form>
            <p className="signIn">Already have an account? <Link to="/login">Sign in</Link> here!</p>  
            {/* {message && <div className="message">{message}</div>}              */}
        </StyledSection>
     );
}
 
export default Register;