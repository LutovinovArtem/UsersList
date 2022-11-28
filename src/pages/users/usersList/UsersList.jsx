import React, { useEffect } from "react";
import style from "./usersList.module.css";
import { Table, Space } from "antd";
import { Loader } from "../../../components/loader/Loader";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { getUsers, deleteUser } from "../../../store/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  reselectUsers,
  reselectError,
  reselectIsLoading,
} from "../../../store/selectors";

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector(reselectUsers);
  const error = useSelector(reselectError);
  const isLoading = useSelector(reselectIsLoading);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDeleteClick = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Имя",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Фамилия",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Аватар",
      key: "avatar",
      render: (_, { avatar }) => (
        <img src={`${avatar}`} alt="none" />
      )
    },
    {
      title: "Действия",
      key: "action",
      render: (_, { id }) => (
        <Space size="middle">
          <div>
            <PagesNavButton
              buttonText="Редактировать"
              goTo={`/editUser/${id}`}
            />
          </div>

          <div>
            <button onClick={() => handleDeleteClick(id)}>
              Удалить
            </button>
          </div>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2> Error: {error}</h2>;
  }

  return (
    <>
      <div className={style.tableHeader}>
        <h1> Таблица пользователей </h1>
        <PagesNavButton buttonText="Добавить" goTo="/addUser" />
      </div>
      <Table dataSource={users} columns={columns} />
    </>
  );
};

export default UsersList;
