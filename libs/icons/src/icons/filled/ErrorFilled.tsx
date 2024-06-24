import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const ErrorFilled = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg className="cmp-icon-inner" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="椭圆形" cx="32" cy="32" r="32"></circle>
        <path
          d="M45.6645047,18.3354953 L18.3354953,45.6645047 M18.3354953,18.3354953 L45.6645047,45.6645047"
          id="形状结合备份"
          stroke="#FFFFFF"
          stroke-width="6"
          stroke-linecap="round"
        ></path>
      </svg>
    </BaseIcon>
  );
};
