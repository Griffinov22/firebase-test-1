import "./App.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./layout";
import Todos from "./pages/Todos";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Index />}>
        <Route index element={<Home />} />
        <Route path="/todos" element={<Todos />} />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
