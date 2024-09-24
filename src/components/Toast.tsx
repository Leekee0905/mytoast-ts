import { useEffect, useState } from "react";
import "../styles/toastStyle.css";
import { createPortal } from "react-dom";
import bus from "../services/eventBus";
import { ToastType } from "../services/showToast";

interface ToastMessage extends ToastType {
  id: number;
}

const Toast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const positions: string[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ];
  useEffect(() => {
    const handleToastEvent = (toast: ToastType) => {
      setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 3000);
    };

    const unsubscribe = bus.subscribe("SHOW_TOAST", handleToastEvent);

    return () => {
      unsubscribe();
    };
  }, []);

  const groupedToasts = positions.reduce(
    (acc: Record<string, ToastMessage[]>, position: string) => {
      acc[position] = toasts.filter((toast) => toast.position === position);
      return acc;
    },
    {}
  );

  const getAnimationClass = (position: string) => {
    if (position.includes("left")) {
      return "slideToLeft";
    }
    if (position.includes("right")) {
      return "slideToRight";
    }
    return "";
  };

  const getSpeedAnimationClass = (speed: boolean | null) => {
    return speed ? "speedy" : null;
  };

  return createPortal(
    <>
      {positions.map((position) => (
        <div key={position} className={`toast-container ${position}`}>
          {groupedToasts[position]?.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.type} ${getAnimationClass(
                position
              )} ${getSpeedAnimationClass(toast.speed)}`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      ))}
    </>,
    document.body
  );
};

export default Toast;
