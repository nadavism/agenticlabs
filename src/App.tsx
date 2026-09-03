import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { OpportunityPage } from './pages/OpportunityPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spend-intelligence" element={<OpportunityPage pageId="spend-intelligence" />} />
      <Route path="/vendor-discovery" element={<OpportunityPage pageId="vendor-discovery" />} />
      <Route path="/revenue-preservation" element={<OpportunityPage pageId="revenue-preservation" />} />
      <Route
        path="/additional-revenue-capture"
        element={<OpportunityPage pageId="additional-revenue-capture" />}
      />
      <Route path="/ai-diagnostic" element={<OpportunityPage pageId="ai-diagnostic" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}
