

export default function setTextures(materials, nodes, textureList) {

    //Set Textures and Colors
    materials.Wood.map = textureList.WoodTexture;
    materials.FloorWood.map = textureList.WhiteWoodTexture;
    materials.Wall.map = textureList.WallTexture;
    materials.Ceiling.map = textureList.WallTexture;
    materials.Stone.map = textureList.WallTexture;
    materials.Couch.map = textureList.CouchTexture;
    materials.Pillow.map = textureList.PillowTexture;
    materials.Pillow2.map = textureList.PillowTexture;
    materials.Globe.map = textureList.GlobeTexture;
    materials.RugWhite.map = textureList.RugTexture;
    materials.WhiteWood.map = textureList.WhiteWoodTexture;
    materials.Granite.map = textureList.GraniteTexture;
    materials.KitchenFloor.map = textureList.WallTexture;

    //For some reason, the map is not being applied all materials
    //This does not happen when importing room2.glb, possible error due to object groups in Blender
    nodes.Scene.children.forEach((child) => {
        if (child.type === "Mesh") {
            if (child.material.name === "Wood") {
                child.material.map = textureList.WoodTexture;
            } else if (child.material.name === "Granite") {
                child.material.map = textureList.GraniteTexture;
            } else if (child.material.name === "WhiteWood") {
                child.material.map = textureList.WhiteWoodTexture;
            } else if (child.material.name === "Couch") {
                child.material.map = textureList.CouchTexture;
            }
        }
        child.children.forEach((grandchild) => {
            if (grandchild.type === "Mesh") {
                if (grandchild.material.name === "Couch") {
                    grandchild.material.map = textureList.CouchTexture;
                }
            }
        });
    });
}