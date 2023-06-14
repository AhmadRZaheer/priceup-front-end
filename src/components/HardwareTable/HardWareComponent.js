import React, { useEffect, useState } from "react";
import wheel from "../../Assets/wheel.svg";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Add, ToggleOff, ToggleOn } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/formSlice";
import { backendURL } from "../../utiles/common";
import axios from "axios";

const HardWareComponent = ({ type }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const formEntries = useSelector((state) => state.form.entries);

  const [hardwareDetail, setHardwareDetail] = React.useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/hardwares`);
        // console.log(response, "response form api");

        if (response.status === 200) {
          setHardwareDetail(response.data);
        } else {
          setError("An error occurred while fetching the data.");
        }
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(hardwareDetail, "hardwareDetail form api");

  const finishTypeOptions = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
    { value: "four", label: "four" },
    { value: "five", label: "five" },
  ];
  const options = [
    { value: "1/2", label: "1/2" },
    { value: "2/4", label: "2/4" },
  ];
  const handleAddFormEntryItems = (id, event) => {
    dispatch(
      addItems({
        id: id,
        data: {
          id: Date.now() % 10000,
          additionalFinishType: "",
          hardwarePartNumber: "",
          cost: "",
          price: "",
          isChecked: "",
          thickness: "",
        },
      })
    );
  };
  const handleToggle = (id) => {
    console.log(id, "id for delete");

    dispatch(handleToggle(id));
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}
    >
      {formEntries.map((entry, mainIndex) => (
        <div
          style={{ borderBottom: "2px solid rgb(232, 232, 232)" }}
          key={mainIndex}
        >
          <div className="cellWrapper" style={{ padding: "8px" }}>
            <div className="customerImg">
              <img className="cellImg" src={wheel} alt="" />
            </div>
            <div className="customerNameTable">
              <div className="userNameTable" style={{ marginLeft: "8px" }}>
                8 x 8 MT Pull-1
              </div>
            </div>
          </div>
          {entry.items?.map((entry, index) => (
            <div key={index}>
              <form>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                  }}
                >
                  <div
                    style={{ width: "250px", padding: 4, alignItems: "center" }}
                  >
                    <Typography>Finish Type</Typography>
                    <Typography variant="h6">Finish Type Name</Typography>
                  </div>

                  <div
                    style={{ width: "250px", padding: 4, alignItems: "center" }}
                  >
                    <Typography>Hardware Part Number</Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      name="hardwarePartNumber"
                      placeholder="Hardware Part Number"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div
                    style={{ width: "250px", padding: 4, alignItems: "center" }}
                  >
                    <Typography>Cost</Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      name="cost"
                      placeholder="Cost"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div
                    style={{ width: "250px", padding: 4, alignItems: "center" }}
                  >
                    <Typography>Price</Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      name="price"
                      placeholder="Price"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div
                    style={{
                      maxWidth: "400px",
                      padding: 4,
                      display: "flex",
                      alignItems: "center",
                      // background: "red",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ marginTop: "18px" }}>
                      <FormControlLabel
                        control={<Checkbox color="primary" name="isChecked" />}
                        label="Price by sqft"
                      />
                    </div>
                    <div
                      style={{
                        width: "150px",
                        padding: 4,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl style={{ width: "100%" }} size="small">
                        <Typography>Thickness</Typography>
                        <TextField
                          select
                          size="small"
                          variant="outlined"
                          name="thickness"
                          style={{ width: "100%" }}
                        >
                          {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? (
                          <ToggleOn
                            style={{
                              width: "45px",
                              height: "45px",
                              color: "rgb(65, 106, 238)",
                            }}
                          />
                        ) : (
                          <ToggleOff
                            style={{
                              width: "45px",
                              height: "45px",
                              color: "rgb(65, 106, 238)",
                            }}
                          />
                        )}
                      </IconButton>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ))}

          <form>
            <div
              style={{
                display: "flex",
                gap: 4,
                alignContent: "center",
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
                <FormControl style={{ width: "100%" }}>
                  <Typography>Finish Type</Typography>
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    name="finishType"
                    style={{ width: "100%" }}
                  >
                    {finishTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>

              <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
                <Typography>Hardware Part Number</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  name="hardwarePartNumber"
                  placeholder="Hardware Part Number"
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
                <Typography>Cost</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  name="cost"
                  placeholder="Cost"
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ width: "250px", padding: 4, alignItems: "center" }}>
                <Typography>Price</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  name="price"
                  placeholder="Price"
                  style={{ width: "100%" }}
                />
              </div>

              <div
                style={{
                  maxWidth: "400px",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginTop: "18px" }}>
                  <FormControlLabel
                    control={<Checkbox color="primary" name="isChecked" />}
                    label="Price by sqft"
                  />
                </div>

                <div
                  style={{ width: "150px", padding: 4, alignItems: "center" }}
                >
                  <FormControl style={{ width: "100%" }} size="small">
                    <Typography>Thickness</Typography>
                    <TextField
                      select
                      size="small"
                      variant="outlined"
                      name="thickness"
                      style={{ width: "100%" }}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                <div style={{ marginTop: "18px" }}>
                  <IconButton onClick={() => handleAddFormEntryItems(entry.id)}>
                    <Add style={{ color: "rgb(65, 106, 238)" }} />
                  </IconButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
};

export default HardWareComponent;
