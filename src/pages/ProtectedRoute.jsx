import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  // const auth = useSelector((store) => store.user.authDetails);
  const auth = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) navigate("/login");
  }, [auth, navigate]);

  return children;
};

export default ProtectedRoute;
