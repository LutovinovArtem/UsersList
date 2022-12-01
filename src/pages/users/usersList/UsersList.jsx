import React, { useEffect } from "react";
import style from "./usersList.module.css";
import { Table, Space } from "antd";
import { Loader } from "../../../components/loader/Loader";
import { Link } from "react-router-dom";
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
import { SearchOutlined } from "@ant-design/icons";

const UsersList = () => {
  const numberOfAllUsers = useSelector(selectNumberOfAllUsers);
  // const totalPages = useSelector(selectTotalPages);
  // const perPage = useSelector(selectPerPage);

  // useEffect(() => {
  //   dispatch(getPages());
  // }, [numberOfAllUsers]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(reselectUsers) || [];
  const error = useSelector(reselectError);
  const isLoading = useSelector(reselectIsLoading);

  useEffect(() => {
    dispatch(getUsers({ page: 1, per_page: numberOfAllUsers }));
    dispatch(getPages());
  }, []);

  const removeUser = (id) => {
    dispatch(deleteUser(id));
  };

  const unLogin = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const searchIcon = () => <SearchOutlined />;

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      filterIcon: searchIcon,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <input
            autoFocus
            placeholder="Фильтр по id"
            value={selectedKeys[0] || []}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                confirm();
              }
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      onFilter: (value, record) => {
        return record.id
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend']
    },
    {
      title: "Почта",
      dataIndex: "email",
      filterIcon: searchIcon,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <input
            autoFocus
            placeholder="Фильтр по email"
            value={selectedKeys[0] || []}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                confirm();
              }
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      onFilter: (value, record) => {
        return record.email
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend']
    },
    {
      title: "Имя",
      dataIndex: "first_name",
      filterIcon: searchIcon,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <input
            autoFocus
            placeholder="Фильтр по имени"
            value={selectedKeys[0] || []}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                confirm();
              }
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      onFilter: (value, record) => {
        return record.first_name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      sortDirections: ['descend']
    },
    {
      title: "Фамилия",
      dataIndex: "last_name",
      filterIcon: searchIcon,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <input
            autoFocus
            placeholder="Фильтр по фамилии"
            value={selectedKeys[0] || []}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                confirm();
              }
            }}
            onBlur={() => {
              confirm();
            }}
          />
        );
      },
      onFilter: (value, record) => {
        return record.last_name
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      },
      sorter: (a, b) => a.last_name.length - b.last_name.length,
      sortDirections: ['descend']
    },
    {
      title: "Аватар",
      dataIndex: "avatar",
      render: (_, { avatar }) => <img src={avatar} alt={<Loader />} />,
    },
    {
      title: "Действия",
      key: "action",
      dataIndex: "action",
      render: (_, { id }) => (
        <Space size="middle">
          <div>
            <Link to={`/users/edit/${id}`}>Редактировать</Link>
          </div>
          <div>
            <button onClick={() => removeUser(id)}>Удалить</button>
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
        <Link to="/users/add">Добавить</Link>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 3,
        }}
      />
    </>
  );
};

export default UsersList;
