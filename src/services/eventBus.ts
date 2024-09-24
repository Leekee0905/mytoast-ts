import { ToastType } from "./showToast";

const EventBus = () => {
  const topics = new Map<string, Array<(data: ToastType) => void>>();

  const subscribe = (topic: string, listener: (data: ToastType) => void) => {
    if (!topics.has(topic)) {
      topics.set(topic, []);
    }
    topics.get(topic)?.push(listener);
    return () => {
      const listeners = topics.get(topic)!;
      listeners.splice(listeners.indexOf(listener), 1);
    };
  };

  const publish = (topic: string, data: ToastType) => {
    if (!topics.has(topic)) return;
    topics.get(topic)?.forEach((listener) => listener(data));
  };

  return { subscribe, publish };
};

const bus = EventBus();
export default bus;
