// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Editor = () => {
//   const [content, setContent] = useState(`
//     <section style="padding:30px;box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;border-radius:10px;background-color:white;">
//       <div style="display:flex;justify-content:space-between;width:100%;text-align:end;">
//         <img width="180" height="180" src="/icons/GCS-logo.png" alt="GCS Logo" />
//         <h1 style="font-size:60px;">
//           Limited lifetime craftsmanship <br />
//           warranty
//         </h1>
//       </div>
//       <div>
//         <div style="margin-top:30px;">
//           <i>
//             This warranty reflects our history of superior craftsmanship,
//             customized design, company integrity, and, most importantly,
//             dedication to our customers. This warranty is our promise to you
//             that we stand behind our products and services.
//           </i>
//         </div>
//         <div style="margin-top:30px;">
//           <p>
//             GCS Glass & Mirror warrants our products against defects in
//             materials and workmanship under normal use for as long as it is
//             owned by the original purchasing business or consumer. This
//             warranty is non-transferable, unless otherwise specified.
//           </p>
//         </div>
//       </div>
//       <div style="margin-top:30px;">
//         <h4>Exclusions & Limitations</h4>
//         <ul>
//           <li>
//             This warranty only applies to products, installations, or services
//             rendered after January 1, 2016.
//           </li>
//           <!-- More list items -->
//         </ul>
//       </div>
//     </section>
//   `);

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       [{ 'font': [] }],
//       [{ 'size': ['small', false, 'large', 'huge'] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'script': 'sub' }, { 'script': 'super' }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       [{ 'indent': '-1' }, { 'indent': '+1' }],
//       [{ 'align': [] }],
//       ['link', 'image', 'video'],
//       ['clean'] // Remove formatting button
//     ],
//   };

//   return (
//     <div>
//       <ReactQuill
//         value={content}
//         onChange={setContent}
//         theme="snow"
//         modules={modules}
//       />
//       <div
//         dangerouslySetInnerHTML={{
//           __html: content,
//         }}
//       />
//     </div>
//   );
// };

// export default Editor;
