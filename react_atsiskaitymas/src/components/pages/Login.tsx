import { useState, useContext} from "react";
import { useNavigate, Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import bcrypt from "bcryptjs";
import styled from "styled-components";

import UsersContext from "../contexts/UsersContext";
import { User, UsersContextTypes } from "../../types";

const StyledSection = styled.section`
    height: calc(100vh - 320px);
    color: #C68B59;
    display: flex;
    flex-direction: column;
    align-items: center;

    >form{
        width: 30%;
        background-color: #C68B59;
        color: #FFF8F1;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        >div{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 10px;
            padding: 10px;
            font-weight: 700;
            border-radius: 10px;

            >input{
                background-color: #FFF8F1;
                color: black;
                border: none;
                border-radius: 10px;
                padding: 5px;
            }
            >span{
                color: #A44A3F;
                font-size: 12px;
            }
        }
        >.button{
            width: 100px;
            margin-top: 15px;
            padding: 5px 0;
            border: 2px solid #FFF8F1;
            border-radius: 15px;
            align-self: center;
            font-weight: 600;
            background-color: #C68B59;
            cursor: pointer;
        }
        >.button:hover{
            background-color: #FFF8F1;
            color: #C68B59;
        }
    }
    >.register{
        font-weight: 600;
        >a{
            color: #C68B59;
        }
        >a:hover{
            color: #A44A3F;
        }
    }
    >.message{
        font-weight:600;
    }
`

const Login = () => {
   
    const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const initValues: Pick<User, 'email'|'password'> = {
        email: '',
        password: ''
    }

    const formik = useFormik({
    initialValues: initValues,
    onSubmit: (values) => {
        const foundUser = users.find(user => 
            user.email === values.email &&
            bcrypt.compareSync(values.password, user.password)
        );
        if(foundUser){
            setMessage("✅ Successfully logged in! Redirecting to the home page...");
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
            setLoggedInUser(foundUser);
            setTimeout(() => {
                navigate('/');   
            }, 2000);
        }else{
            setMessage("❌ Incorrect email or password!");           
        }
    },
    validationSchema: Yup.object({
        email: Yup.string()
          .email()
          .required("Field must be filled")
          .trim(),
        password: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
            'Password must be 8–25 characters long and include uppercase, lowercase, number, and special character (@$!%*?&)')
          .required("Field must be filled")
          .trim()
      })
    });

    return ( 
        <StyledSection>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
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
                <input type="submit" value="Login" className='button'/>
            </form>
            <p className="register">Don't have an account? <Link to="/register">Register</Link> here!</p>  
            {message && <div className="message">{message}</div>} 
        </StyledSection>
     );
}
 
export default Login;