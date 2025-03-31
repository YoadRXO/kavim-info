import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DanBadarom } from "./components/dan-badarom/DanBadarom.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "dan-badarom", element: <DanBadarom /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </QueryClientProvider>
);
