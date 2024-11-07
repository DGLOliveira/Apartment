export default function setShadows(nodes) {

    nodes.SnakePlantMale.children.forEach((child) => {
        if (child.type === "Mesh") {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    nodes.SnakePlantFemale.children.forEach((child) => {
        if (child.type === "Mesh") {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    
    nodes.Scene.children.forEach((child) => {
        if (child.type === "Mesh") {
            if (
                child.material.name !== "SurfaceGlass" &&
                child.material.name !== "Water" &&
                child.material.name !== "WindowGlass"
            ) {
                //child.castShadow = true;
                child.receiveShadow = true;
            }
            if (child.name === "Desk" ||
                child.name === "SmallTable" ||
                child.name === "DoorHallBathroom" ||
                child.name === "DoorBedroom" ||
                child.name === "DoorPrivateBathroom" ||
                child.name === "GraniteTopKitchen" ||
                child.name === "GraniteTop2Kitchen" ||
                child.name === "Chair001" ||
                child.name === "ChairPillows" ||
                child.name === "Paper1" ||
                child.name === "Paper2" ||
                child.name === "MouseRug" ||
                child.name === "Globe" ||
                child.name === "PencilCup" ||
                child.name === "Bookcase" ||
                child.name === "Trashcan" ||
                child.name === "Cuprug1" ||
                child.name === "Cuprug2" ||
                child.name === "MetalTable" ||
                child.name === "WoodChair1" ||
                child.name === "WoodChair2" ||
                child.name === "WardrobeBase" ||
                child.name === "ThinSawLeaf014"
            ) {
                child.castShadow = true;
            }
        }
        if (child.type === "Group") {
            child.children.forEach((grandchild) => {
                if (grandchild.type === "Mesh") {
                    //Anything that is not a transparent material can receive shadows
                    if (
                        grandchild.material.name !==
                        "SurfaceGlass" &&
                        grandchild.material.name !== "Water" &&
                        grandchild.material.name !==
                        "WindowGlass"
                    ) {
                        grandchild.receiveShadow = true;
                    }
                    //Allows for walls, roof and floor to cast shadows
                    if (child.name === "Apartment") {
                        grandchild.castShadow = true;
                    }
                    else if(child.name === "CornerTable") {
                        grandchild.castShadow = true;
                    }
                    //List of objects inside a group that can cast a shadow
                    if (
                        grandchild.name === "Mesh_27" || /*Big Couch frame */
                        grandchild.name === "Cube012_2" || /*Big Couch frame */
                        grandchild.name === "Mesh_29" || /*Small Couch frame */
                        grandchild.name === "Cube016_1" || /*Small Couch frame */
                        grandchild.name === "Cube007_1" ||/*TV Table*/
                        grandchild.name === "Cube011_1" ||/*Monitor 1 frame*/
                        grandchild.name === "Cube031_1" ||/*Monitor 2 frame*/
                        grandchild.name === "Cube030" ||/*Keyboard base*/
                        grandchild.name === "Cube051" ||/*Modem box*/
                        grandchild.name === "Cylinder014" ||  /*Globe Base*/
                        grandchild.name === "Cylinder002" ||  /*Coffee Mug*/
                        grandchild.name === "Mesh_37" ||  /*Female Snake Plant*/
                        grandchild.name === "Mesh_38" ||  /*Female Snake Plant Pot*/
                        grandchild.name === "Mesh_23" ||/*Male Snake Plant outer leaf*/
                        grandchild.name === "Mesh_24" ||  /*Male Snake Plant inner leaf*/
                        grandchild.name === "Mesh_25" ||  /*Male Snake Plant Pot*/
                        grandchild.name === "Cylinder008" ||  /*Kitchen Plant Pot*/
                        grandchild.name === "Cylinder008_2" ||  /*Kitchen Plant*/
                        grandchild.name === "Cube040" || /*PC Case*/
                        grandchild.name === "Sphere_3" || /*Audio Top*/
                        grandchild.name === "Sphere001_3" || /*Audio Bottom*/
                        grandchild.name === "Cube027" || /*Kitchen Chair*/
                        grandchild.name === "Cube027_1" || /*Kitchen Chair*/
                        grandchild.name === "Cube027_2" || /*Kitchen Chair*/
                        grandchild.name === "Cube145" ||/*Bed Frame*/
                        grandchild.name === "Cube146" ||/*Bed */
                        grandchild.name === "Cube148" ||/*End Table*/
                        grandchild.name === "Cube148_1" || /*End Table Legs */
                        grandchild.name === "Cube111_1" || /*Window Door Frame Bedroom*/
                        grandchild.name === "Cube112_1" || /*Window Door Frame Bedroom*/
                        grandchild.name === "Cube113_1" || /*Window Door Frame Living Room */
                        grandchild.name === "Cube114_1" || /*Window Door Frame Living Room */
                        grandchild.name === "Cube101"  /*Window Door Frame */
                    ) {
                        grandchild.castShadow = true;
                    }
                }
            });
        }
    });
}