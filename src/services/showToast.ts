import bus from "./eventBus";

export interface ToastType {
  message: string;
  type: string;
  position: string;
  speed: boolean | null;
}
export const showToast = ({ message, type, position, speed }: ToastType) => {
  bus.publish("SHOW_TOAST", { message, type, position, speed });
};
