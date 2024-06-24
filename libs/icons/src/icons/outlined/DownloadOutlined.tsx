import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const DownloadOutlined = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg className="cmp-icon-inner" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M7.6,0h0.8c0.2,0,0.4,0.2,0.4,0.4l0,0v9.1L11.3,7c0.1-0.1,0.4-0.2,0.5,0l0,0l0.6,0.6c0.1,0.1,0.2,0.4,0,0.5l0,0
	l-4.1,4.1c-0.1,0.1-0.4,0.2-0.5,0l0,0L3.7,8.2C3.6,8,3.6,7.8,3.7,7.6l0,0L4.3,7c0.1-0.1,0.4-0.2,0.5,0l0,0l2.3,2.3l0-8.9
	C7.2,0.2,7.3,0,7.6,0L7.6,0h0.8H7.6z M1.8,12.7c0.2,0,0.4,0.2,0.4,0.4v1.2h11.5v-1.2c0-0.2,0.2-0.4,0.4-0.4H15
	c0.2,0,0.4,0.2,0.4,0.4v2.1c0,0.5-0.4,0.8-0.8,0.8H1.4c-0.5,0-0.8-0.4-0.8-0.8v-2.1c0-0.2,0.2-0.4,0.4-0.4H1.8z"
        />
      </svg>
    </BaseIcon>
  );
};
