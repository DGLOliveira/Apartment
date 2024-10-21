import { useState, useRef, useEffect, useContext } from "react";
import { Plane, Html } from "@react-three/drei";
import { DeviceStateContext } from "../../../state/DeviceState";
import { LightStateContext } from "../../../state/LightState";
import "./SmartHome.css";

import { AiOutlineHome, AiOutlineFormatPainter } from "react-icons/ai";
import { RiLightbulbLine } from "react-icons/ri";

export function SmartHome() {
  const deviceState = useContext(DeviceStateContext);
  const lightState = useContext(LightStateContext);
  const [pageState, setPageState] = useState("");

  const changeLights = (name, parameter, value) => {
      switch(name) {
        case "LivingRoom":
          lightState.setLivingRoom({
            ...lightState.LivingRoom,
            [parameter]: value
          })
          break;
        case "Kitchen":
          lightState.setKitchen({
            ...lightState.Kitchen,
            [parameter]: value
          })
          break;
        case "Bedroom":
          lightState.setBedroom({
            ...lightState.Bedroom,
            [parameter]: value
          })
          break;
        case "Backyard":
          lightState.setBackyard({
            ...lightState.Backyard,
            [parameter]: value
          })
          break;
        case "CommonBathroom":
          lightState.setCommonBathroom({
            ...lightState.CommonBathroom,
            [parameter]: value
          })
          break;
        case "PrivateBathroom":
          lightState.setPrivateBathroom({
            ...lightState.PrivateBathroom,
            [parameter]: value
          })
          break;
      }
    
  }

  return (
    <Html
      scale={0.04}
      position={[4.745, 1.51, 3.0362]}
      zIndexRange={[0, 2]}
      className="content"
      transform
      occlude
    >
      {deviceState.SmartHome.ON ?
        <>
          <div className="navbar">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setPageState("");
              }}
            >
              <AiOutlineHome />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setPageState("Lights");
              }}
            >
              <RiLightbulbLine />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setPageState("Apartment");
              }}
            >
              <AiOutlineFormatPainter />
            </div>
          </div>
          <div className="wrapper">
            <div
              className={
                pageState === "Lights" ? "section" : "section collapseHeight"
              }
            >
              <h2>Customize Lights</h2>
              {Object.keys(lightState).map((name) => (
                name.slice(0, 3) !== "set" &&
                <div className="section" key={name}>
                  <h4>{name}</h4>
                    Color:
                    <input
                      type="color"
                      value={lightState[name].color}
                      onChange={(e) => (changeLights(name, "color", e.target.value))}
                    />
                    <br />
                    Power:
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={lightState[name].power}
                      onChange={(e) => (changeLights(name, "power", e.target.value))}
                    />
                </div>
              )
              )}
            </div>
            <div
              className={
                pageState === "Apartment" ? "section" : "section collapseHeight"
              }
            >
              <h2>Under Maintenance</h2>
              {/*
              <h2>Customize Apartment</h2>
              <div className="section">
                <legend>Wood Floor</legend>
                <label htmlFor="WoodFloor">Color: </label>
                <input
                  type="color"
                  id="WoodFloor"
                  value={apartmentStyle.MainFloorColor}
                  onChange={(e) => (setApartmentStyle({ ...apartmentStyle, MainFloorColor: e.target.value }))}
                />
              </div>
              <br />
              <div className="section">
                <legend>Walls</legend>
                <label htmlFor="WallColor">Color: </label>
                <input
                  type="color"
                  id="WallColor"
                  value={apartmentStyle.WallColor}
                  onChange={(e) => (setApartmentStyle({ ...apartmentStyle, WallColor: e.target.value }))}
                />
              </div>
              <br />
              <div className="section">
                <legend>Ceiling</legend>
                <label htmlFor="CeilingColor">Color: </label>
                <input
                  type="color"
                  id="CeilingColor"
                  value={apartmentStyle.CeilingColor}
                  onChange={(e) => (setApartmentStyle({ ...apartmentStyle, CeilingColor: e.target.value }))}
                />
              </div>
              <br />
              <div className="section">
                <legend>Bathroom Floor</legend>
                <label htmlFor="BathroomFloorColor">Color: </label>
                <input
                  type="color"
                  id="BathroomFloorColor"
                  value={apartmentStyle.BathroomFloorColor}
                  onChange={(e) => (setApartmentStyle({ ...apartmentStyle, BathroomFloorColor: e.target.value }))}
                />
              </div>*/}
            </div>
          </div>
          <div className="wave1">SmartHome</div>
          <div className="wave2" />
          <div className="wave3" />
        </> : null}
    </Html>
  );
}
