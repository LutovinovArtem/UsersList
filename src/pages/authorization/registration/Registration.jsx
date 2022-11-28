import React, { useState } from "react";
import style from "./registration.module.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registration } from "../../../API/user/register";
import { statusOK } from "../../../API/responseStatus";

const Registration = () => {
  const onSubmit = (values) => {
    registration(values).then((response) => {
      if (response.status === statusOK) {
        console.log("РЕГИСТРАЦИЯ УСПЕШНА !");
        // localStorage.setItem("token");
      }
    });

    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

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

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Регистрация </h1>

        <br />
        <label>
          Почта:
          <br />
          <input
            {...register("email", {
              required: "Введите почту!",
              minLength: 1,
              maxLength: {
                value: 128,
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
          <input
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
          <button type="submit" disabled={!isValid} className={style.button}>
            Регистрация
          </button>
          <Link to="/">
            <button className={style.button}> Назад </button>
          </Link>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Registration;
