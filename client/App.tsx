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
import { GoogleAuthProvider } from "./components/GoogleAuthProvider";

// Lazy load pages for better performance
import { Suspense, lazy } from "react";
import { PostLoginVerification } from "./components/PostLoginVerification";
import { Loader2 } from "lucide-react";

// Lazy loaded pages
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Workers = lazy(() => import("./pages/Workers"));
const WorkerDetails = lazy(() => import("./pages/WorkerDetails.tsx"));
const Bookings = lazy(() => import("./pages/Bookings.tsx"));
const BookingDetails = lazy(() => import("./pages/BookingDetails.tsx"));
const BookService = lazy(() => import("./pages/BookService.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LocationDemo = lazy(() => import("./pages/LocationDemo"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Support = lazy(() => import("./pages/Support"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy loaded worker pages
const JoinAsWorker = lazy(() => import("./pages/workers/JoinAsWorker"));
const SkillTraining = lazy(() => import("./pages/workers/SkillTraining"));
const GetVerified = lazy(() => import("./pages/workers/GetVerified"));
const ResumeBuilder = lazy(() => import("./pages/workers/ResumeBuilder"));
const WorkerSupport = lazy(() => import("./pages/workers/WorkerSupport"));
const FindCustomers = lazy(() => import("./pages/FindCustomers"));
const CustomerSupport = lazy(() => import("./pages/CustomerSupport"));
const JoinAsCustomer = lazy(() => import("./pages/JoinAsCustomer"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="text-lg font-medium text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error boundary fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8">
    <div className="text-center max-w-md">
      <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6">We're sorry, but something went wrong. Please try refreshing the page.</p>
      <div className="space-x-4">
        <Button onClick={resetErrorBoundary} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Refresh page
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 text-left bg-gray-100 p-4 rounded">
          <summary className="cursor-pointer font-medium">Error details (dev only)</summary>
          <pre className="mt-2 text-sm text-red-600 whitespace-pre-wrap">{error.message}</pre>
        </details>
      )}
    </div>
  </div>
);
import CustomerVerification from "./pages/CustomerVerification";
// import GovtSchemes from "./pages/workers/GovtSchemes";

// Service Category Pages
import HomeServices from "./pages/services/HomeServices";
import ConstructionServices from "./pages/services/ConstructionServices";
import ElectricalServices from "./pages/services/ElectricalServices";
import PlumbingServices from "./pages/services/PlumbingServices";
import CleaningServices from "./pages/services/CleaningServices";
import GardeningServices from "./pages/services/GardeningServices";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { ChatbotWidget } from "./components/chat/ChatbotWidget";
import { ScrollToTop } from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Disable refetch on window focus for better UX
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on client errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      {/* GoogleAuthProvider temporarily disabled to prevent OAuth errors */}
      {/* <GoogleAuthProvider> */}
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
                          <ScrollToTop />
                          <div className="min-h-screen flex flex-col bg-background">
                            <Navigation />
                            <main className="flex-1">
                              <Suspense fallback={<PageLoader />}>
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
                      
                      {/* Service Category Routes */}
                      <Route path="/services/home" element={<HomeServices />} />
                      <Route path="/services/construction" element={<ConstructionServices />} />
                      <Route path="/services/electrical" element={<ElectricalServices />} />
                      <Route path="/services/plumbing" element={<PlumbingServices />} />
                      <Route path="/services/cleaning" element={<CleaningServices />} />
                      <Route path="/services/gardening" element={<GardeningServices />} />
                      
                      {/* Worker Portal Routes */}
                      <Route path="/join-as-worker" element={<JoinAsWorker />} />
                      <Route path="/join-as-customer" element={<JoinAsCustomer />} />
                      <Route path="/find-customers" element={<FindCustomers />} />
                      <Route path="/customer-support" element={<CustomerSupport />} />
                      <Route path="/customer-verification" element={<CustomerVerification />} />
                      <Route path="/skill-training" element={<SkillTraining />} />
                      <Route path="/get-verified" element={<GetVerified />} />
                      <Route path="/resume-builder" element={<ResumeBuilder />} />
                      <Route path="/worker-support" element={<WorkerSupport />} />
                      {/* <Route path="/government-schemes" element={<GovtSchemes />} /> */}
                      
                      {/* Auth routes */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/verify-email" element={<VerifyEmail />} />
                      
                      {/* Verification route */}
                      <Route 
                        path="/verify-account" 
                        element={
                          <ProtectedRoute>
                            <PostLoginVerification />
                          </ProtectedRoute>
                        } 
                      />

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
                        path="/book-service"
                        element={
                          <ProtectedRoute>
                            <BookService />
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
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* 404 route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                              </Suspense>
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
      {/* </GoogleAuthProvider> */}
    </QueryClientProvider>
  </ErrorBoundary>
);const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

// Only create root if it doesn't exist
if (!container.hasAttribute('data-root-created')) {
  const root = createRoot(container);
  container.setAttribute('data-root-created', 'true');
  root.render(<App />);
}
