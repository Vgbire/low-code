import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const SuccessFilled = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg className="cmp-icon-inner" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="椭圆形" cx="32" cy="32" r="32"></circle>
        <path
          d="M17,33 L29,44 M29,44 L48,24"
          id="形状结合"
          stroke="#FFFFFF"
          stroke-width="6"
          stroke-linecap="round"
        ></path>
      </svg>
    </BaseIcon>
  );
};
