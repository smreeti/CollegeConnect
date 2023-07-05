// import React, { useRef, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import M from 'materialize-css'
// import fetchData from '../../utils/FetchAPI'
// import { API_TO_FETCH_PROFILE_DETAILS } from '../../utils/APIRequestUrl'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";

// const UserViewPost = () => {
//     const openUserPost = useRef(null);
//     const [userDetails, setUserDetails] = useState([])

//     useEffect(() => {
//         M.Modal.init(openUserPost.current)
//     }, []);

//     const handleCloseModal = () => {
//         M.Modal.getInstance(openUserPost.current).close();
//     }

//     return (
//         <div id="openUserPost" className="modal modcen" ref={openUserPost}>
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h4 className="modal-title">Title</h4>

//                         <FontAwesomeIcon
//                             icon={faTimes}
//                             className="close"
//                             onClick={handleCloseModal}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserViewPost;
