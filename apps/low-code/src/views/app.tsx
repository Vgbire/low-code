import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { CommonProvider } from 'src/context';
import { routes } from '../router';
import '../style/index.scss';

export function App() {
  const queryClient = new QueryClient();
  return (
    <ConfigProvider locale={zhCN} prefixCls="ant-prefix">
      <QueryClientProvider client={queryClient}>
        <CommonProvider>
          <RouterProvider router={routes} />
        </CommonProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
