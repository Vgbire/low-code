import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const SystemImageFilled = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg
        className="cmp-icon-inner"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3613"
        width="128"
        height="128"
      >
        <path
          d="M188.631579 404.210526h646.736842l188.631579 188.631579H0l188.631579-188.631579z"
          fill="#DBDDDF"
          p-id="3614"
        ></path>
        <path d="M0 594.917053h970.105263V916.210526H0V594.917053z" p-id="3615"></path>
        <path
          d="M970.105263 646.736842v215.578947H53.894737v-215.578947h916.210526zM0 592.842105v323.368421h1024V592.842105H0z"
          fill="#AFB1B6"
          p-id="3616"
        ></path>
        <path d="M781.473684 700.631579h80.842105v80.842105h-80.842105v-80.842105z" fill="#59FC59" p-id="3617"></path>
      </svg>
    </BaseIcon>
  );
};
