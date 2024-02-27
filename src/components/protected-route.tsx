import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = auth.currentUser;
  // console.log("로그인후", user);
  // if (user === null) {
  //   return <Navigate to="/login" />;
  // }
  // return children;

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log("로그인후", user);
    if (user === null) {
      return <Navigate to="/login" />;
    }
  });
  return children;
}
