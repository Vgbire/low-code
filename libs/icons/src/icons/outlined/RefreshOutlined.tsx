import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const RefreshOutlined = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg className="cmp-icon-inner" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path
          d="M10.1,6.4C9.8,6.4,9.7,6.2,9.7,6V5.1c0-0.2,0.2-0.4,0.4-0.4h2.7C11.7,3.2,10,2.3,8,2.3C4.8,2.3,2.2,4.8,2.2,8
	c0,3.2,2.6,5.8,5.8,5.8c2.6,0,4.8-1.7,5.5-4.1h1.7c-0.8,3.3-3.7,5.8-7.2,5.8c-4.1,0-7.4-3.3-7.4-7.4c0-4.1,3.3-7.4,7.4-7.4
	c2.3,0,4.4,1.1,5.8,2.8l0-2.3c0-0.2,0.2-0.4,0.4-0.4H15c0.2,0,0.4,0.2,0.4,0.4v4.5c0,0.4-0.3,0.8-0.8,0.8l-0.1,0H10.1z"
        />
      </svg>
    </BaseIcon>
  );
};
