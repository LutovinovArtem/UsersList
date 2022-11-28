import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./login.module.css";
import { login } from "../../../API/user/login";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    login(values).then(({ data: { token } }) => {
      localStorage.setItem("token", token);
      navigate("/usersList");
    });
    reset();
  };

  const [passwordType, setPasswordType] = useState("password");
  const [toggleText, setToggleText] = useState("show");

  const togglePasswordType = () => {
    if (passwordType === "password") {
      setToggleText("hide");
      setPasswordType("text");
    } else {
      setToggleText("show");
      setPasswordType("password");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
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
            <button
              className={style.toggleButton}
              onClick={() => togglePasswordType()}
            >
              {toggleText}
            </button>
          </>
        </label>

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
          {/* Link не работает с submit */}
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
