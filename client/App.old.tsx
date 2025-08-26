import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route 
                path="/workers" 
                element={
                  <Placeholder 
                    title="Find Workers" 
                    description="Browse and hire verified workers in your area"
                    suggestion="This page will show worker profiles with ratings, skills, and availability"
                  />
                } 
              />
              <Route 
                path="/join-worker" 
                element={
                  <Placeholder 
                    title="Join as Worker" 
                    description="Start earning by offering your skills and services"
                    suggestion="This page will have worker registration form with KYC verification"
                  />
                } 
              />
              <Route 
                path="/training" 
                element={
                  <Placeholder 
                    title="Skill Training" 
                    description="Enhance your skills with government-certified training programs"
                    suggestion="This page will show available courses and skill development programs"
                  />
                } 
              />
              <Route 
                path="/verification" 
                element={
                  <Placeholder 
                    title="Worker Verification" 
                    description="Get verified to build trust with customers"
                  />
                } 
              />
              <Route 
                path="/resume-builder" 
                element={
                  <Placeholder 
                    title="Digital Resume Builder" 
                    description="Create professional resumes showcasing your skills and experience"
                  />
                } 
              />
              <Route 
                path="/government-schemes" 
                element={
                  <Placeholder 
                    title="Government Schemes" 
                    description="Discover and apply for relevant government benefits and schemes"
                  />
                } 
              />
              <Route 
                path="/worker-support" 
                element={
                  <Placeholder 
                    title="Worker Support" 
                    description="Get help and support for all your queries"
                  />
                } 
              />
              <Route 
                path="/privacy" 
                element={
                  <Placeholder 
                    title="Privacy Policy" 
                    description="Learn how we protect your data and privacy"
                  />
                } 
              />
              <Route 
                path="/terms" 
                element={
                  <Placeholder 
                    title="Terms of Service" 
                    description="Read our terms and conditions"
                  />
                } 
              />
              <Route 
                path="/support" 
                element={
                  <Placeholder 
                    title="Support Center" 
                    description="Get help and find answers to common questions"
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
