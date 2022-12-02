import React, { useEffect } from "react";
import style from "./editUser.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Loader } from "../../../components/loader/Loader";
import { editUser } from "../../../store/users/slices/usersSlice";
import { getUser } from "../../../store/users/slices/userSlice";
import {
  selectUser,
  selectUserError,
  selectUserIsLoading,
} from "../../../store/users/selectors/userSelectors";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    // почему он заполняет поля ?
    reset({
      email: user?.email,
      firstName: user?.first_name,
      lastName: user?.last_name,
      avatar: user?.avatar,
    });
  }, [user]);

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // defaultValues: {
    //   email: user.email,
    //   firstName: user.first_name,
    //   lastName: user.last_name,
    //   avatar: user.avatar,
    // },
  });

  const onSubmit = (value) => {
    dispatch(editUser({ value: value, id: id }));
    navigate("/users");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2> Error: {error}</h2>;
  }

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> Редактирование пользователя </h1>

        <label>
          Почта:
          <br />
          <input
            type="email"
            {...register("email", {
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
          <Link to="/users">Назад</Link>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
