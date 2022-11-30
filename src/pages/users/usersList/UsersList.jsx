import React, { useEffect } from "react";
import style from "./usersList.module.css";
import { Table, Space } from "antd";
import { Loader } from "../../../components/loader/Loader";
import { PagesNavButton } from "../../../components/Button/pagesNavButton/PagesNavButton";
import { getUsers, deleteUser } from "../../../store/users/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  reselectUsers,
  reselectError,
  reselectIsLoading,
} from "../../../store/users/selectors/usersSelectors";
import { getPages } from "../../../store/pages/pagesSlice";
import {
  // selectTotalPages,
  selectNumberOfAllUsers,
} from "../../../store/pages/pagesSelectors";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(reselectUsers) || [];
  const error = useSelector(reselectError);
  const isLoading = useSelector(reselectIsLoading);

  const numberOfAllUsers = useSelector(selectNumberOfAllUsers);
  // const totalPages = useSelector(selectTotalPages);
  // const perPage = useSelector(selectPerPage);

  useEffect(() => {
    dispatch(getUsers({ page: 1, per_page: 12 }));
    dispatch(getPages());
  }, []);

  const handleDeleteClick = (id) => {
    dispatch(deleteUser(id));
  };

  const unLogin = () => {
    localStorage.removeItem("token");
    navigate("/");
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
      dataIndex: "avatar",
      render: (_, { avatar }) => <img src={avatar} alt="none" />,
    },
    {
      title: "Действия",
      key: "action",
      dataIndex: "action",
      render: (_, { id }) => (
        <Space size="middle">
          <div>
            <PagesNavButton
              buttonText="Редактировать"
              goTo={`/users/edit/${id}`}
            />
          </div>

          <div>
            <button onClick={() => handleDeleteClick(id)}>Удалить</button>
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
      <button onClick={unLogin}>Выход</button>

      <div className={style.tableHeader}>
        <h1> Таблица пользователей </h1>
        <PagesNavButton buttonText="Добавить" goTo="/users/add" />
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 4, // кол-во элм на странице
          total: numberOfAllUsers, // общее кол-во элм
          // onChange: (page) => {
          //   dispatch(getUsers({ page: 2, per_page: 6 }));
          // },
        }}
      />
    </>
  );
};

export default UsersList;
