import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Bookmark from "./pages/Bookmark";
import Promotion from "./pages/Promotion";
import Luxury from "./pages/Luxury";
import Administration from "./pages/Administration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index path="/booking" element={<Booking />}></Route>
          <Route path="/promotion" element={<Promotion />}></Route>
          <Route path="/luxury" element={<Luxury />}></Route>
          <Route path="/bookmark" element={<Bookmark />}></Route>
          <Route path="/administration" element={<Administration />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
