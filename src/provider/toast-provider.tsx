import { Toaster } from "sonner";

const ToastProvider = () => {
  return (
    <Toaster
      theme="light"
      richColors
      position="top-right"
      className="bg-neutral-100 shadow-lg"
    />
  );
};

export default ToastProvider;
