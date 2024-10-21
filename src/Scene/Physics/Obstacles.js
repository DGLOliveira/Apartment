import {useMemo} from "react";
import { useBox, usePlane, useTrimesh } from "@react-three/cannon";

export function Obstacles({ obstacleObjects }) {
  //let position = [0, 0, 2.5];
  let modifiedObstacles = [];
  obstacleObjects.forEach((object, index) => {
    modifiedObstacles[index] = { 
      geometry: structuredClone(object.geometry.attributes.position.array),
      index: structuredClone(object.geometry.index.array),
      position: structuredClone(object.position),
      rotation: [structuredClone(object.rotation._x), structuredClone(object.rotation._y), structuredClone(object.rotation._z)],
      scale: [structuredClone(object.scale.x), structuredClone(object.scale.y), structuredClone(object.scale.z)]
     };
     if(index < 9){
    modifiedObstacles[index].geometry = modifiedObstacles[index].geometry.map((x) => x * 5);
    modifiedObstacles[index].position.z += 2.5;
  }
    //modifiedObstacles[index].position.x *= 5;
  });
  function ObstacleFactory(obstacle, index) {
    let position=[obstacle.position.x, obstacle.position.y, obstacle.position.z];
    //let rotation=[obstacle.rotation.x, obstacle.rotation.y, obstacle.rotation.z];
    return useTrimesh(() => ({
      type: "Static",
      args: [obstacle.geometry, obstacle.index],
      position: position,
      rotation: obstacle.rotation,
      scale: obstacle.scale
    }))
  };
  modifiedObstacles.forEach((obstacle, index) => {
    ObstacleFactory(obstacle, index);
  });

  const [voidPlane] = usePlane(() => ({
    type: "Static",
    position: [0, -10, 0],
    rotation: [-Math.PI / 2, 0, 0],
    args: [100, 100],
  }));
    const [deskMain] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-3.6, 0.45, -2.15],
      args: [2.7, 0.8, 0.45]
    }));
    const [deskSide] = useBox(() => ({
      type: "Static",
      rotation: [0, Math.PI/2, 0],
      position: [-2.45, 0.45, -1.1],
      args: [2.7, 0.8, 0.45]
    }));
    const [LivingRoomShelf] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-3.85, 0.5, 2.2],
      args: [2.2, 1, 0.6]
    }));
    const [glassTable]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0.1, 0.2, -0.97],
      args: [1.8, 0.4, 0.75]
    }));
    const [tvTable]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0.05, 0.2, -2.35],
      args: [3.3, 0.4, 0.3]
    }));
    const [bigCouchBase]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0.05, 0.2, 0.6],
      args: [2.95, 0.4, 1.05]
    }));
    const [bigCouchBack]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0.05, 0.6, 0.9],
      args: [2.95, 0.4, 0.4]
    }));
    const [bigCouchLeftArm]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [1.48, 0.6, 0.6],
      args: [0.15, 0.4, 1]
    }));
    const [bigCouchRightArm]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-1.35, 0.6, 0.6],
      args: [0.15, 0.4, 1]
    }));
    const [smallCouchBase]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [2.23, 0.2, -0.53],
      args: [1, 0.4, 1.15]
    }));
    const [smallCouchBack]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [2.55, 0.6, -0.53],
      args: [0.35, 0.4, 1.15]
    }));
    const [smallCouchLeftArm]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [2.23, 0.6, -0.02],
      args: [1, 0.4, 0.15]
    }));
    const [smallCouchRightArm]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [2.23, 0.6, -1.02],
      args: [1, 0.4, 0.15]
    }));
    const [cornerTable]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [2, 0.35, 0.45],
      args: [0.9, 0.7, 0.8]
    }));
    const [KitchenBack]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [8.5, 0.5, 0.45],
      args: [1.15, 1, 4.8]
    }));
    const [KitchenFront]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [4.77, 0.55, -0.65],
      args: [1.15, 1.1, 3.8]
    }));
    const [KitchenSide]= useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [6.77, 0.55, -2.45],
      args: [3, 1.1, 1.1]
    }));
    /*const [closet] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-0.725, 0, 0.165],
      args: [0.45, 1, 0.1]
    }));
    const [livingRoomShelf] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-0.845, 0.225, -0.07],
      args: [0.3, 0.45, 0.1]
    }));
    const [deskFront] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-0.73, 0.225, -0.95],
      args: [0.5, 0.45, 0.1]
    }));
    const [deskSide] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [-0.5, 0.1, -0.75],
      args: [0.1, 0.2, 0.4]
    }));
    const [bigCouchBack] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0, 0.075, -0.3],
      args: [0.56, 0.15, 0.05]
    }));
    const [smallCouchBack] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0.5, 0.05, -0.6],
      args: [0.05, 0.1, 0.2]
    }));
    const [glassTable] = useBox(() => ({
      type: "Static",
      rotation: [0, 0, 0],
      position: [0.01, 0.033, -0.685],
      args: [0.37, 0.075, 0.14]
    }))*/
  return (
    <>
    </>
  );
}
