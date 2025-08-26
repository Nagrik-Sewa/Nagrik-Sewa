import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LocationProvider } from "./contexts/LocationContext";
import { FontProvider } from "./contexts/FontContext";
import { SocketProvider } from "./contexts/SocketContext";
import { ChatbotProvider } from "./contexts/ChatbotContext";

// Pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import Workers from "./pages/Workers";
import WorkerDetails from "./pages/WorkerDetails.tsx";
import Bookings from "./pages/Bookings.tsx";
import BookingDetails from "./pages/BookingDetails.tsx";
import Profile from "./pages/Profile.tsx";
import Dashboard from "./pages/Dashboard";
import LocationDemo from "./pages/LocationDemo";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import NotFound from "./pages/NotFound";

// Worker Pages
import JoinAsWorker from "./pages/workers/JoinAsWorker";
import SkillTraining from "./pages/workers/SkillTraining";
import GetVerified from "./pages/workers/GetVerified";
import ResumeBuilder from "./pages/workers/ResumeBuilder";
import WorkerSupport from "./pages/workers/WorkerSupport";
import GovtSchemes from "./pages/workers/GovtSchemes";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { ChatbotWidget } from "./components/chat/ChatbotWidget";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (renamed from cacheTime)
      retry: (failureCount, error: any) => {
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <FontProvider>
          <LocationProvider>
            <AuthProvider>
              <SocketProvider>
                <ChatbotProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter 
                      future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                      }}
                    >
                <div className="min-h-screen flex flex-col bg-background">
                  <Navigation />
                  <main className="flex-1">
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/workers" element={<Workers />} />
                      <Route path="/workers/:id" element={<WorkerDetails />} />
                      <Route path="/demo" element={<LocationDemo />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/support" element={<Support />} />
                      
                      {/* Worker Portal Routes */}
                      <Route path="/join-as-worker" element={<JoinAsWorker />} />
                      <Route path="/skill-training" element={<SkillTraining />} />
                      <Route path="/get-verified" element={<GetVerified />} />
                      <Route path="/resume-builder" element={<ResumeBuilder />} />
                      <Route path="/worker-support" element={<WorkerSupport />} />
                      <Route path="/government-schemes" element={<GovtSchemes />} />
                      
                      {/* Auth routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/verify-email" element={<VerifyEmail />} />

                      {/* Protected routes */}
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/bookings"
                        element={
                          <ProtectedRoute>
                            <Bookings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/bookings/:id"
                        element={
                          <ProtectedRoute>
                            <BookingDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        }
                      />

                      {/* 404 route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
                <ChatbotWidget />
              </BrowserRouter>
            </TooltipProvider>
          </ChatbotProvider>
        </SocketProvider>
      </AuthProvider>
      </LocationProvider>
    </FontProvider>
  </LanguageProvider>
</ThemeProvider>
</QueryClientProvider>
);

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

// Only create root if it doesn't exist
if (!container.hasAttribute('data-root-created')) {
  const root = createRoot(container);
  container.setAttribute('data-root-created', 'true');
  root.render(<App />);
}
