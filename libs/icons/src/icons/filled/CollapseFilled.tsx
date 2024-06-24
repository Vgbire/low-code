import BaseIcon from '../../components/base-icon';

interface IProps {
  [key: string]: any;
}
export const CollapseFilled = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <svg
        className="cmp-icon-inner"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1235"
      >
        <path
          d="M243.939556 493.25511101a28.444444 28.444444 0 0 0 0 37.46133299l331.975111 379.448889c17.294222 19.740444 49.863111 7.509333 49.863111-18.773333L625.777778 132.608c0-26.254222-32.568889-38.485333-49.863111-18.716444l-331.946667 379.392z"
          fill="#000000"
          p-id="1236"
        ></path>
      </svg>
    </BaseIcon>
  );
};
