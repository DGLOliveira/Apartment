export default function setVisibility(nodes) {
    
    nodes.Scene.children.forEach((child) => {
        if (child.type === "Mesh") {
            //Sets default lampshades to invisible, to be replaced with objects generated in the <Lights /> component
            if (child.name === "TopLampLivingRoom" ||
                child.name === "TopLampLivingRoom001" ||
                child.name === "TopLampStudy005" ||
                child.name === "TopLampStudy004"
            ) {
                child.visible = false;
            }
            //Sets statues to invisible for performance reasons
            /*if (child.name === "FigurineLion" ||
                child.name === "FigurineThinker" ||
                child.name === "FigurineDavid" ||
                child.name === "FigurineTorso" ||
                child.name === "FigurineWhale") {
                child.visible = false;
            }*/
        }
    })
}