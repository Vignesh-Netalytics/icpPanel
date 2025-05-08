import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/Header";
import { TaskAccordion } from "@/components/TaskAccordion";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-neutral-100 flex flex-col">
        <Header />
        <main className="flex-1 container max-w-5xl py-8">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-primary-400 mb-2">Task Management Dashboard</h1>
            <p className="text-muted-foreground mb-8">Review and manage all pending ICP tasks</p>
            <TaskAccordion />
          </div>
        </main>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;