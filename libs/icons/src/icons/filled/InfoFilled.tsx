import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const InfoFilled = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg className="cmp-icon-inner" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="椭圆形" cx="12" cy="12" r="12"></circle>
        <path
          d="M12,17.0402821 L12,11.2515435 M12,8.04028214 L12,7.1155313"
          id="形状结合"
          stroke="#FFFFFF"
          stroke-width="2.25"
          stroke-linecap="round"
        ></path>
      </svg>
    </BaseIcon>
  );
};
