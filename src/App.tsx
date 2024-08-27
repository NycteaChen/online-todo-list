import { AuthLayout } from "@/layouts/authLayout";
import { SignIn } from "@/pages/Auth/SignIn";
import { SignUp } from "@/pages/Auth/SignUp";
import { ToDo } from "@/pages/ToDo";
import { AuthGuard } from "@/middleware/AuthGuard";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AuthGuard Component={<ToDo />} needAuth={true} />}
        />
        <Route path="/auth">
          <Route
            element={<AuthGuard Component={<AuthLayout />} needAuth={false} />}
          >
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
