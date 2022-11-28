import React from "react";
import style from "./editUser.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reselectUsers } from "../../../store/selectors";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { useForm } from "react-hook-form";
import { editUser } from "../../../store/users/usersSlice";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const users = useSelector(reselectUsers);
  const user = users?.find((user) => user.id === parseInt(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (values, id) => {
    dispatch(editUser(values, id));
  };

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Редактирование пользователя </h1>

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
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Неправильный формат почты!",
              },
            })}
            type="email"
            defaultValue={`${user.email}`}
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
            defaultValue={user.first_name}
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
            defaultValue={user.last_name}
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
            defaultValue={user.avatar}
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
          <button type="submit">Изменить</button>

          <PagesNavButton buttonText="Назад" goTo="/usersList" />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
