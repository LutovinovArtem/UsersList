import React, { useEffect, useState } from "react";
import style from "./usersList.module.css";
import { Table, Space, Input, Button } from "antd";
import { Loader } from "../../../components/loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../../store/users/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "../../../store/pages/pagesSlice";
import { SearchOutlined } from "@ant-design/icons";
import {
  reselectUsers,
  reselectError,
  reselectIsLoading,
} from "../../../store/users/selectors/usersSelectors";
import {
  // selectPerPage,
  // selectTotalPages,
  selectNumberOfAllUsers,
} from "../../../store/pages/pagesSelectors";

import { changeUsers } from "../../../store/users/slices/usersSlice";

const UsersList = () => {
  const numberOfAllUsers = useSelector(selectNumberOfAllUsers);
  // const perPage = useSelector(selectPerPage);
  // const totalPages = useSelector(selectTotalPages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(reselectUsers) || [];
  const error = useSelector(reselectError);
  const isLoading = useSelector(reselectIsLoading);

  const PAGE_SIZE = 3;

  useEffect(() => {
    dispatch(getUsers({ page: 0, per_page: 12 }));
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

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      filterIcon: searchIcon,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Фильтр по id"
              value={selectedKeys}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  confirm();
                }
              }}
            />
            <br />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>

              <Button
                onClick={() => handleReset(clearFilters, confirm)}
                size="small"
                style={{ width: 90 }}
              >
                Сброс
              </Button>
            </Space>
          </>
        );
      },
      onFilter: (value, { id }) => {
        return String(id).toLowerCase().includes(String(value).toLowerCase());
      },

      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
      filterIcon: searchIcon,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Фильтр по почте"
              value={selectedKeys}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  confirm();
                }
              }}
            />
            <br />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>

              <Button
                onClick={() => handleReset(clearFilters, confirm)}
                size="small"
                style={{ width: 90 }}
              >
                Сброс
              </Button>
            </Space>
          </>
        );
      },
      onFilter: (value, { email }) => {
        return String(email)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      },
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend"],
    },

    {
      title: "Имя",
      dataIndex: "first_name",
      key: "first_name",
      filterIcon: searchIcon,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Фильтр по имени"
              value={selectedKeys}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  confirm();
                }
              }}
            />
            <br />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>

              <Button
                onClick={() => handleReset(clearFilters, confirm)}
                size="small"
                style={{ width: 90 }}
              >
                Сброс
              </Button>
            </Space>
          </>
        );
      },
      onFilter: (value, { first_name }) => {
        return String(first_name)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      },
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Фамилия",
      dataIndex: "last_name",
      key: "last_name",
      filterIcon: searchIcon,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Фильтр по фамилии"
              value={selectedKeys}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  confirm();
                }
              }}
            />
            <br />
            <Space>
              <Button
                type="primary"
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Поиск
              </Button>

              <Button
                onClick={() => handleReset(clearFilters, confirm)}
                size="small"
                style={{ width: 90 }}
              >
                Сброс
              </Button>
            </Space>
          </>
        );
      },
      onFilter: (value, { last_name }) => {
        return String(last_name)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      },
      sorter: (a, b) => a.last_name.length - b.last_name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Аватар",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, { avatar }) => <img src={avatar} alt={<Loader />} />,
    },
    {
      title: "Действия",
      dataIndex: "action",
      key: "action",
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

  const [value, setValue] = useState();

  const handleChangeSearch = (e) => setValue(e.target.value);

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

      <div style={{ marginBottom: 10 }}>
        <Input.Search
          placeholder="Поиск"
          value={value}
          onChange={handleChangeSearch}
          onPressEnter={() => {
            const filteredResults = users.filter((user) => {
              return (
                String(value).toLowerCase() === String(user.id).toLowerCase() ||
                String(value).toLowerCase() ===
                  String(user.email).toLowerCase() ||
                String(value).toLowerCase() ===
                  String(user.first_name).toLowerCase() ||
                String(value).toLowerCase() ===
                  String(user.last_name).toLowerCase()
              );
            });

            if (filteredResults.length) {
              dispatch(changeUsers(filteredResults));
            }
            if (filteredResults.length === 0) {
              dispatch(getUsers());
            }
          }}
        />
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: PAGE_SIZE,
          total: numberOfAllUsers,
          // showSizeChanger: true,
          // onChange: (page) => {
          //   dispatch(getUsers({ page: page, per_page: PAGE_SIZE }));
          // },
        }}
      />
    </>
  );
};

export default UsersList;
