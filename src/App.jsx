import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Bookmark from "./pages/Bookmark";
import Promotion from "./pages/Promotion";
import Luxury from "./pages/Luxury";
import Administration from "./pages/Administration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={"/booking"} />}></Route>

            <Route index path="/booking" element={<Booking />}></Route>
            <Route path="/promotion" element={<Promotion />}></Route>
            <Route path="/luxury" element={<Luxury />}></Route>
            <Route path="/bookmark" element={<Bookmark />}></Route>
            <Route path="/administration" element={<Administration />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
