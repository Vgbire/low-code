import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState(['/']);
  const items: any[] = [
    {
      key: '/',
      label: '表格',
    },
    {
      key: '/form',
      label: '表单',
    },
    {
      key: '/modal',
      label: '弹窗',
    },
    {
      key: '/component',
      label: '组件',
    },
  ];

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, []);

  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <div
        style={{
          minHeight: '100vh',
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={({ key }: any) => {
            setSelectedKeys([key]);
            navigate(key);
          }}
          style={{
            width: 100,
            height: '100%',
            transition: 'width .3s',
          }}
        />
      </div>
      <div
        style={{
          flex: 'auto',
          boxSizing: 'border-box',
          background: '#fff',
          minHeight: '100vh',
          transition: 'width .3s',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};
