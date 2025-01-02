import { Errors } from "../Errors/errors";

export interface FormWrapperProps<T> {
  children: React.ReactNode;
  redirectTo?: string;
  className?: string;
  action: (
    actionReturn: ActionReturn<T>,
    formData: FormData
  ) => Promise<ActionReturn<T>>;
}

export interface AdditionalDataContextType<T> {
  additionalData: FormData | undefined;
  addAdditionalData: (newValue: FormData) => void;
  actionReturn: ActionReturn<T>;
  pending: boolean;
}

export type ActionReturn<T> = {
  status: "success" | "failure";
  data: T;
  errors?: Errors<T>;
} | null;
