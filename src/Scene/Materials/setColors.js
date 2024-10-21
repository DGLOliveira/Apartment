import { Color } from 'three';

export default function setColors(materials, apartmentStyle) {
    console.log(materials);
    materials.FloorWood.color = new Color(apartmentStyle.MainFloorColor);
    materials.Stone.color = new Color(apartmentStyle.BathroomFloorColor);
    materials.Wall.color = new Color(apartmentStyle.WallColor);
    materials.Ceiling.color = new Color(apartmentStyle.CeilingColor);
    
}