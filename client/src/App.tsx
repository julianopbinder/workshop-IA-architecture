// Sala de Controle Editorial: estrutura escura, tipografia editorial e navegação discreta para foco na história.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import McpPage from "./pages/McpPage";
import RagPage from "./pages/RagPage";
import SubagentsPage from "./pages/SubagentsPage";
import SummaryPage from "./pages/SummaryPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/skill"} component={Home} />
      <Route path={"/mcps"} component={McpPage} />
      <Route path={"/subagentes"} component={SubagentsPage} />
      <Route path={"/resumo"} component={SummaryPage} />
      <Route path={"/rag"} component={RagPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
