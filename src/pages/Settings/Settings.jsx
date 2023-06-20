import React from "react";
import "./settings.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <div className="Title">Settings</div>
        <form>
          <div>
            <label htmlFor="fiel">Upload you Profile Picture</label>
            <input type="file" id="file" name="file" />
          </div>
          <div className="test">
            <div className="input-block">
              <label htmlFor="name" className="input-label">
                Location
              </label>
              <input
                type="text"
                autoComplete="off"
                name="location"
                placeholder="Add Location"
                id="Location"
              ></input>
            </div>
          </div>
          <h3 className="heading">Misc, Pricing</h3>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              Pricing factor
            </label>
            <p className="explain">Factor to Multiply Price </p>
            <input
              type="number"
              autoComplete="off"
              name="pf"
              placeholder="add factor"
              id="pf"
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              Default Hourly rate
              <p className="explain">
                Hourly rates to be used for labour price{" "}
              </p>
            </label>
            <input
              type="number"
              autoComplete="off"
              name="dh"
              placeholder="Ad"
              id="dh"
            ></input>
          </div>
          <h3 className="heading">Fabrication Pricing</h3>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              1" Hole (1/2in Glass)
            </label>
            <input
              type="text"
              autoComplete="off"
              name="location"
              placeholder="Add Location"
              id="Location"
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              1" Hole (3/8in Glass)
            </label>
            <input
              type="text"
              autoComplete="off"
              name="location"
              placeholder="Add Location"
              id="Location"
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              Clamp Cutout (1/2in){" "}
            </label>
            <input
              type="text"
              autoComplete="off"
              name="location"
              placeholder="Add Location"
              id="Location"
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              Clamp Cutout (3/8in)
            </label>
            <input
              type="text"
              autoComplete="off"
              name="location"
              placeholder="Add Location"
              id="Location"
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              Hinge Cutout (1/2in)
            </label>
            <input
              type="text"
              autoComplete="off"
              name="location"
              placeholder="Add Location"
              id="Location"
            ></input>
          </div>
          <div className="input-block">
            <label htmlFor="name" className="input-label">
              Hinge Cutout (3/8in)
            </label>
            <input
              type="text"
              autoComplete="off"
              name="location"
              placeholder="Add Location"
              id="Location"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
