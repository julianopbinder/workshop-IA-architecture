// Sala de Controle Editorial: estrutura escura, tipografia editorial e navegação discreta para foco na história.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import McpPage from "./pages/McpPage";
import TopicPage from "./pages/TopicPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/skill"} component={Home} />
      <Route path={"/mcps"} component={McpPage} />
      <Route path={"/subagentes"}>{() => <TopicPage ativo="subagentes" tema="Subagentes" descricao="Uma página própria para entender como uma IA pode delegar partes de uma tarefa maior a outros agentes." />}</Route>
      <Route path={"/rag"}>{() => <TopicPage ativo="rag" tema="RAG" descricao="Uma página própria para entender como a IA busca informações antes de formular uma resposta." />}</Route>
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
