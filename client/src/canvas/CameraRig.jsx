import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
import { useRef } from "react";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    //set 3d  model according to screen sizes helpers
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    //set initial position of 3d model
    let targetPositon = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakPoint) targetPositon = [0, 0, 2];
      if (isMobile) targetPositon = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPositon = [0, 0, 2.5];
      else targetPositon = [0, 0, 2];
    }

    //set camera model position
    easing.damp3(state.camera.position, targetPositon, 0.25, delta);

    //set the model rotate smoothly for each frame
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
