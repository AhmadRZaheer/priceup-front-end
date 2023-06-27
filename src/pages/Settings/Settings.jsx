import React from "react";
import "./settings.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  pf: Yup.number().required("Pricing factor is required"),
  dh: Yup.number().required("Default Hourly rate is required"),
});

const initialValues = {
  location: "spain",
  pf: "45",
  dh: "12",
};

const handleSubmit = (values) => {
  // Handle form submission
  console.log(values, "efjdks");
};
console.log(Formik.values, "formik");

const Settings = () => {
  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <div className="Title">Settings</div>
        {/* <form>
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
        </form> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <form>
            <div>
              <label htmlFor="file">Upload your Profile Picture</label>
              <Field type="file" id="file" name="file" />
            </div>
            <div className="test">
              <div className="input-block">
                <label htmlFor="location" className="input-label">
                  Location
                </label>
                <Field
                  type="text"
                  autoComplete="off"
                  name="location"
                  placeholder="Add Location"
                  id="location"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <h3 className="heading">Misc, Pricing</h3>
            <div className="input-block">
              <label htmlFor="pf" className="input-label">
                Pricing factor
              </label>
              <p className="explain">Factor to Multiply Price</p>
              <Field
                type="number"
                autoComplete="off"
                name="pf"
                placeholder="Add factor"
                id="pf"
              />
              <ErrorMessage name="pf" component="div" className="error" />
            </div>
            <div className="input-block">
              <label htmlFor="dh" className="input-label">
                Default Hourly rate
                <p className="explain">
                  Hourly rates to be used for labour price
                </p>
              </label>
              <Field
                type="number"
                autoComplete="off"
                name="dh"
                placeholder="Add"
                id="dh"
              />
              <ErrorMessage name="dh" component="div" className="error" />
            </div>
            <h3 className="heading">Fabrication Pricing</h3>
            {/* Add the rest of the form fields here */}
            <button type="submit">Submit</button>
          </form>
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
