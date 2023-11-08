import { useAppSelector } from "hooks/redux";

type Props = {
  id: string;
  children: JSX.Element;
};

export const Toggle = ({ id, children }: Props): JSX.Element => {
  const show = useAppSelector((state) => state.toggleReducer[id]);

  return show ? children : <></>;
};

export default Toggle;
