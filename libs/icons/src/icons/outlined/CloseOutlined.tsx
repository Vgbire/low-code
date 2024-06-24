import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const CloseOutlined = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg
        className="cmp-icon-inner"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2199"
        width="200"
        height="200"
      >
        <path
          d="M225.834667 225.834667a42.666667 42.666667 0 0 1 60.330666 0L512 451.669333l225.834667-225.834666a42.666667 42.666667 0 1 1 60.330666 60.330666L572.330667 512l225.834666 225.834667a42.666667 42.666667 0 0 1-60.330666 60.330666L512 572.330667l-225.834667 225.834666a42.666667 42.666667 0 0 1-60.330666-60.330666L451.669333 512 225.834667 286.165333a42.666667 42.666667 0 0 1 0-60.330666z"
          p-id="2200"
        ></path>
      </svg>
    </BaseIcon>
  );
};
