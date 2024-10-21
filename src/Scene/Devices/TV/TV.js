import { useEffect, useState, useContext } from "react";
import { useVideoTexture, Html } from "@react-three/drei";
import { DeviceStateContext } from "../../../state/DeviceState";
import "./TV.css";

export default function TV() {
  const deviceState = useContext(DeviceStateContext);
  /*
  let texture = useVideoTexture(chan1.src);
  return (
    <mesh position={[0, 1.68, -2.3]} rotation={[0.1, 0, 0]}>
      <planeBufferGeometry args={[2, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );*/
  const streamList = [
    {
      title: "Lo-Fi HipHop",
      category: "Music",
      src: "https://www.youtube.com/embed/jfKfPfyJRdk"
    },
    {
      title: "Radio Rock Classic",
      category: "Music",
      src: "https://www.youtube.com/embed/Va-h6WZPUzQ"
    },
    {
      title: "Classical Piano Music",
      category: "Music",
      src: "https://www.youtube.com/embed/tSlOlKRuudU"
    },
    {
      title: "Sky News",
      category: "News",
      src: "https://www.youtube.com/embed/9Auq9mYxFEE"
    },
    {
      title: "EuroNews",
      category: "News",
      src: "https://www.youtube.com/embed/pykpO5kQJ98"
    },
    {
      title: "Nat Geo Wild",
      category: "Documentary",
      src: "https://www.youtube.com/embed/6zGV59Ldp3s"
    },
    {
      title: "National Geographic",
      category: "Documentary",
      src: "https://www.youtube.com/embed/306xLRnW3Cc"
    }
  ];
  useEffect(() => {}, []);
  //console.log(streamList[0].title)
  const [currStream, setCurrStream] = useState(0);
  return (
    <Html
      scale={0.055}
      position={[0, 1.64, -2.4]}
      rotation={[0.05, 0, 0]}
      transform
      occlude
      zIndexRange={[1, 0]}
    >
        {deviceState.SmartTV.ON ? <iframe
          width="1440"
          height="700"
          src={streamList[currStream].src}
          title="lofi hip hop radio - beats to relax/study to"
          frameBorder="0"
          allow=""
        ></iframe>
      : null}
    </Html>
  );
};
