import type { FormEventHandler, ReactNode } from "react";

interface propsType {
  classes?: string;
  submit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export const FormInput = (props: propsType): JSX.Element => {
  const { classes, submit, children } = props;

  return (
    <form className={`flex flex-col ${classes}`} onSubmit={submit}>
      {children}
    </form>
  );
};
