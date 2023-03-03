import { ChangeEvent } from "react";
import { TextField } from "../Form";

interface propsType {
  title: string;
  subtitle: string;
  nameMin: string;
  valueMin: number;
  onChangeMin: (e: ChangeEvent<HTMLInputElement>) => void;
  labelMin: string;
  idMin: string;
  nameMax: string;
  valueMax: number;
  onChangeMax: (e: ChangeEvent<HTMLInputElement>) => void;
  labelMax: string;
  idMax: string;
  preInput: JSX.Element;
}

export const RangeFilter = (props: propsType) => {
  const { title, subtitle, nameMin, valueMin, onChangeMin, labelMin, idMin, nameMax, valueMax, onChangeMax, labelMax, idMax, preInput } = props;

  return (
    <div className="py-6">
      <h3 className="text-2xl font-medium">{title} range</h3>
      <p className="text-slate-500">{subtitle}</p>
      <div className="mt-4 px-10">
        {/* TODO: <input type="range" className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200" id="customRange1" /> */}
        <div className="flex flex-row w-full gap-4 items-center justify-center">
          <TextField className="w-full" type="number" name={nameMin} value={valueMin} change={onChangeMin} label={labelMin} id={idMin} preInput={preInput} />
          <span className="text-slate-400">-</span>
          <TextField className="w-full" type="number" name={nameMax} value={valueMax} change={onChangeMax} label={labelMax} id={idMax} preInput={preInput} />
        </div>
      </div>
    </div>
  );
};
