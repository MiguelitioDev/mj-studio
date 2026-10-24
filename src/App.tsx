import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Container } from "./components/ui/Container";
import HomePage from "./pages/HomePage";

const ModelsPage = lazy(() => import("./pages/ModelsPage"));
const ModelDemoPage = lazy(() => import("./pages/ModelDemoPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const QuotePage = lazy(() => import("./pages/QuotePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageFallback() {
  return (
    <Container>
      <p role="status">Carregando…</p>
    </Container>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="modelos" element={<ModelsPage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="orcamento" element={<QuotePage />} />
          <Route path="privacidade" element={<PrivacyPage />} />
          <Route path="termos" element={<TermsPage />} />
          <Route path="acessibilidade" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="modelos/:slug" element={<ModelDemoPage />} />
      </Routes>
    </Suspense>
  );
}
