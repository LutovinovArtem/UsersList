import React from "react";
import style from "./addUser.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { addUserAsync } from "../../../store/users/usersSlice";

const AddUser = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (values) => {
    dispatch(addUserAsync(values));
    reset();
  };

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Добавление пользователя </h1>

        <label>
          Почта:
          <br />
          <input
            type="email"
            {...register("email", {
              required: "Введите почту!",
              minLength: 1,
              maxLength: {
                value: 150,
                message: "Максимальное число символов 128.",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Неправильный формат почты!",
              },
            })}
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
          Имя:
          <br />
          <input
            {...register("firstName", {
              required: "Введите имя!",
              minLength: 1,
              maxLength: {
                value: 150,
                message: "Максимальное число символов 128.",
              },
            })}
          />
          <br />
        </label>
        <div style={{ height: 20 }}>
          {" "}
          {errors.firstName && (
            <p style={{ color: "red" }}>
              {" "}
              {errors.firstName.message || "Error!"}{" "}
            </p>
          )}{" "}
        </div>

        <label>
          Фамилия:
          <br />
          <input
            {...register("lastName", {
              required: "Введите фамилию!",
              minLength: 1,
              maxLength: {
                value: 150,
                message: "Максимальное число символов 128.",
              },
            })}
          />
          <br />
        </label>
        <div style={{ height: 20 }}>
          {" "}
          {errors.lastName && (
            <p style={{ color: "red" }}>
              {" "}
              {errors.lastName.message || "Error!"}{" "}
            </p>
          )}{" "}
        </div>

        <label>
          Аватар:
          <br />
          <input
            type="url"
            {...register("avatar", {
              minLength: 1,
              maxLength: {
                value: 150,
                message: "Максимальное число символов 128.",
              },
            })}
            defaultValue="https://"
          />
          <br />
        </label>
        <div style={{ height: 20 }}>
          {" "}
          {errors.avatar && (
            <p style={{ color: "red" }}>
              {" "}
              {errors.avatar.message || "Error!"}{" "}
            </p>
          )}{" "}
        </div>

        <div className={style.buttonWrapper}>
          <button type="submit">Добавить</button>

          <PagesNavButton buttonText="Назад" goTo="/usersList" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
