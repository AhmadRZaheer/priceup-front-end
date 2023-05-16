// import React from 'react'
// import './hardware.scss'

// const Hardware = () => {
//   return (
//     <div>Hardware</div>
//   )
// }

// export default Hardware

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "../../redux/counterSlice";

// function Hardware() {
//   const count = useSelector((state) => state.counter);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//     </div>
//   );
// }

// export default Hardware;

import React from "react";
import "./hardware.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import HardwareTable from "../../components/HardwareTable/HardwareTable";

const Hardware = () => {
  return (
    <div className="Customers">
      <Sidebar />
      <div className="customersContainer">
        <HardwareTable />
      </div>
    </div>
  );
};

export default Hardware;
