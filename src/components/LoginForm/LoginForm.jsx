import style from "./LoginForm.module.css";
import moneyGuardIcon from "../../assets/moneyGuard.svg";
import emailIcon from "../../assets/Icons/emailIcon.svg";
import passwordIcon from "../../assets/Icons/passwordIcon.svg";
import { Form, Formik, Field, ErrorMessage } from "formik";
import loginValidationSchema from "../../schemas/loginValidationSchema";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginThunk } from "../../redux/Auth/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then((data) => {
        toast.success(`Welcome ${data.user.username}!`);
        navigate("/");
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
    resetForm();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.title}>
          <img
            className={style.moneyGuardIcon}
            src={moneyGuardIcon}
            alt="Money Guard Icon"
          />
          <h3 className={style.titleText}>Money Guard</h3>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={style.form}>
              <div className={style.inputWrapper}>
                <div className={style.inputContainer}>
                  <img
                    src={emailIcon}
                    alt="Email Icon"
                    className={style.icon}
                  />
                  <Field
                    className={style.input}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    autoFocus
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={style.error}
                />
              </div>
              <div className={style.inputWrapper}>
                <div className={style.inputContainer}>
                  <img
                    src={passwordIcon}
                    alt="Password Icon"
                    className={style.icon}
                  />
                  <Field
                    className={style.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={style.error}
                />
              </div>

              {/* Strong Pass ile ilgili Library'e bakicam... */}
              <div className={style.buttons}>
                <button
                  type="submit"
                  className={style.buttonRegister}
                  disabled={isSubmitting}
                >
                  LOG IN
                </button>
                <Link to="/register">
                  <button type="button" className={style.buttonLogin}>
                    REGISTER
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
