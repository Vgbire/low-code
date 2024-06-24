import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const WaitingFilled = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg className="cmp-icon-inner" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle id="椭圆形" cx="12" cy="12" r="12"></circle>
        <path
          d="M15.2852379,15.3583394 L11.6602379,13.3583394 M11.6602379,13.3583394 L11.6602379,7.56960082"
          id="形状结合"
          stroke="#FFFFFF"
          stroke-width="2.25"
          stroke-linecap="round"
        ></path>
      </svg>
    </BaseIcon>
  );
};
