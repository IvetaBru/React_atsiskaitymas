import { useContext} from "react";
import { useNavigate, Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import bcrypt from "bcryptjs";
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import UsersContext from "../contexts/UsersContext";
import { User, UsersContextTypes } from "../../types";

const StyledSection = styled.section`
    text-align: center;
    color: black;
`

const Login = () => {
    const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
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
            setLoggedInUser(foundUser);
            navigate('/');
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
            <ArrowBackIcon onClick={()=> navigate(-1)}  className="back"/>
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
                    <p>{formik.errors.email}</p>
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
                    <p>{formik.errors.password}</p>
                }
                </div>
                <input type="submit" value="Login" className='button'/>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link> here!</p>   
        </StyledSection>
     );
}
 
export default Login;