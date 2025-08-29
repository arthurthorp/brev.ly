import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ToastProvider } from "./context/toast/ToastProvider";
import { Toast } from "./components/ui/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toast />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
