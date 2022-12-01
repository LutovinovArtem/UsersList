import React from "react";
import style from "./registration.module.css";
import { useForm } from "react-hook-form";
import { registration } from "../../../store/authorization/registerSlice";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { useToggleShowPassword } from "../../../hooks/useToggleShowPassword";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Registration = () => {
  // Compound Components ?
  const [toggleButton, passwordType] = useToggleShowPassword();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    await dispatch(registration(values));
    navigate("/users");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

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
          {toggleButton}
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

          <PagesNavButton buttonText="Назад" goTo="/" />
        </div>
        <br />
      </form>
    </div>
  );
};

export default Registration;
