import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { setup, SetupResult } from "./setup";

const MUDContext = createContext<SetupResult | null>(null);

type Props = {
  children: ReactNode;
};

export const MUDProvider = ({ children }: Props) => {
  const currentValue = useContext(MUDContext);
  const [value, setValue] = useState<SetupResult | null>(null);

  useEffect(() => {
    const fn = async function () {
      setValue(await setup());
    };
    fn();
  }, []);
  if (currentValue) throw new Error("MUDProvider can only be used once");
  if (!value) return <></>;
  return <MUDContext.Provider value={value}>{children}</MUDContext.Provider>;
};

export const useMUD = () => {
  const value = useContext(MUDContext);
  if (!value) throw new Error("Must be used within a MUDProvider");
  return value;
};
