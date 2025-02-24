import { xrStore } from "@/src/services/xrStore";

export function EnterVRButton() {
  return (
    <button
      className="bg-white w-full h-10 text-black"
      onClick={() => xrStore.enterVR()}
    >
      Enter VR
    </button>
  );
}
