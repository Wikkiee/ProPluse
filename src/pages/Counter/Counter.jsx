// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment } from "../../reducers/counterSlice.js";
// import { useNavigate } from "react-router-dom";

// export function Counter() {
//   const count = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div>
//         <button
//           className="bg-blue-600"
//           aria-label="Increment value"
//           onClick={() => dispatch(increment())}
//         >
//           Increment
//         </button>
//         <br></br>
//         <span>{count}</span>
//         <br></br>
//         <button
//           className="bg-green-600"
//           aria-label="Decrement value"
//           onClick={() => dispatch(decrement())}
//         >
//           Decrement
//         </button>
//         <br></br>
//         <button
//           className="bg-red-600"
//           onClick={() => {
//             navigate("/");
//           }}
//         >
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// }
