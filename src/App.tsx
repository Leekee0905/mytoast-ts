import Toast from "./components/Toast";
import { showToast } from "./services/showToast";

function App() {
  return (
    <>
      <button
        onClick={() =>
          showToast({
            message: "에러입니다",
            type: "error",
            position: "bottom-left",
            speed: null,
          })
        }
      >
        에러
      </button>
      <button
        onClick={() =>
          showToast({
            message: "잘됨!",
            type: "success",
            position: "bottom-right",
            speed: null,
          })
        }
      >
        성공
      </button>
      <button
        onClick={() =>
          showToast({
            message: "그냥 토스트",
            type: "",
            position: "top-right",
            speed: null,
          })
        }
      >
        그냥 토스트
      </button>
      <button
        onClick={() =>
          showToast({
            message: "짱 빠른 토스트",
            type: "success",
            position: "top-left",
            speed: true,
          })
        }
      >
        빠른 토스트
      </button>
      <Toast />
    </>
  );
}

export default App;
