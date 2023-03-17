import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/Users";
import { signInUser } from "../services/UsersService";

interface SignInProps {
  setIsLogin: Function;
}

const SignIn: FunctionComponent<SignInProps> = ({ setIsLogin }) => {
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      password: yup.string().min(4).max(12).required(),
      email: yup.string().email().required(),
    }),
    onSubmit: (values: User) => {
      signInUser(values)
        .then(({ data }) => {
          if (!data.length) return alert("The email or password is wrong");
          sessionStorage.setItem(
            "IsLogin",
            JSON.stringify({
              isLoggedIn: true,
              isBusiness: data[0].isBusiness,
              userId: data[0].id,
            })
          );
          setIsLogin(true);
          navigate("/allCards");
        })
        .catch((error) => console.log(error));
    },
  });

  let navigate = useNavigate();

  return (
    <>
      <div className="container mt-4 col-md-4 text-center">
        <h5 className="display-4 text-center">Sign in</h5>
        <small className="mb-4">Sign in to your account</small>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="emailInput">Email</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="passwordInput">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success my-3 w-100"
            disabled={!formik.isValid || !formik.dirty}
          >
            Sign in
          </button>
          <label>
            New user? <Link to="/sign-up"> sign up here</Link>
          </label>
          <br />
          <label>
            New business owner?
            <Link to="/business-sign-up"> sign up here</Link>
          </label>
        </form>
      </div>
    </>
  );
};

export default SignIn;
