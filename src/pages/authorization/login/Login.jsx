import React, { useState } from "react";
import style from "./login.module.css";
import { useForm } from "react-hook-form";
import { login } from "../../../store/authorization/loginSlice";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(login(values));
    navigate("/users");
  };

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div className={style.formWrapper}>
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
              type={passwordShow ? "text" : "password"}
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
        <button type="button" onClick={togglePassword}>
          {passwordShow ? "Cкрыть" : "Показать"}
        </button>

        <div style={{ height: 20 }}>
          {" "}
          {errors.password && (
            <p style={{ color: "red" }}>
              {" "}
              {errors.password.message || "Error!"}{" "}
            </p>
          )}{" "}
        </div>

        <div className={style.buttonWrapper}>
          <button type="submit" disabled={!isValid}>
            Авторизация
          </button>

          <PagesNavButton buttonText="Регистрация" goTo="/registration" />
        </div>
      </form>
    </div>
  );
};

export default Login;
