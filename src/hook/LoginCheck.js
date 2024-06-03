import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';

const useLoginCheck = () => {
  const { user, isLoading } = useContext(ServiceContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user.isLoggedIn())
    {
      message.warning("请先登录");
      navigate("/login");
    }
  }, [user, navigate, isLoading]);  // 添加 isLoading 到依赖数组
};

export default useLoginCheck;
