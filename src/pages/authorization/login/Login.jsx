import React from "react";
import style from "./login.module.css";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../../store/authorization/loginSlice";
import { useToggleShowPassword } from "../../../hooks/useToggleShowPassword";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [toggleButton, passwordType] = useToggleShowPassword();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(login(values));
    navigate("/users");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  // const { handleSubmit, control } = useForm();

  return (
    <div className={style.formWrapper}>
      {/* <h1> Авторизация </h1>
      <section>
        <label>Логин</label>
        <br />
        <Controller
          // placeholder="AntD Input"
          control={control}
          name="Login"
          render={({ field: {value, invalid} }) => <input {...field} />}
        />
      </section>

      <section>
        <label>Пароль</label>
        <br />
        <Controller
          // placeholder="AntD Input"
          control={control}
          name="Password"
          render={({ field }) => <input {...field} />}
        />
      </section>

      <br />
      <div className={style.buttonWrapper}>
        {/* <button type="submit" disabled={!isValid}> */}
        {/* <button type="submit">Авторизация</button>
        <Link to="/registration">Регистрация</Link>
      </div> */} 

      {/* ////////////////////////////////////////////////////////////////////// */}
       <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Авторизация </h1>

        <label>
          Почта:
          <br />
          <input
            {...register("email", {
              required: "Введите почту!",
              minLength: 1,
              maxLength: {
                value: 150,
                message: "Максимальное число символов 128.",
              },
              value: "eve.holt@reqres.in",
            })}
            type="email"
          />
          <br />
        </label>
        <div style={{ height: 20 }}>
          {" "}
          {errors.email && (
            <p style={{ color: "red" }}> {errors.email.message || "Error!"} </p>
          )}{" "}
        </div>

        <label>
          Пароль:
          <br />
          <>
            <input
              type={passwordType}
              {...register("password", {
                required: "Введите пароль!",
                minLength: 1,
                maxLength: {
                  value: 128,
                  message: "Максимальное число символов 128.",
                },
              })}
            />
          </>
        </label>
        {toggleButton}

        <div style={{ height: 20 }}>
          {" "}
          {errors.password && (
            <p style={{ color: "red" }}>
              {" "}
              {errors.password.message || "Error!"}{" "}
            </p>
          )}{" "}
        </div> 
      {/* ////////////////////////////////////////////////////////////////////// */}
      <div className={style.buttonWrapper}>
          <button type="submit" disabled={!isValid}>
            Авторизация
          </button>
          <Link to="/registration">Регистрация</Link>
        </div>
      </form> 
    </div>
  );
};

export default Login;
