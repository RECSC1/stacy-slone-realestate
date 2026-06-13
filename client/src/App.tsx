import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteLayout } from "./components/layout/SiteLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Communities from "./pages/Communities";
import CommunityDetail from "./pages/CommunityDetail";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import HomeValuation from "./pages/HomeValuation";
import AIHomeSearch from "./pages/AIHomeSearch";
import Concierge from "./pages/Concierge";
import PropertyAlerts from "./pages/PropertyAlerts";
import MortgageCalculator from "./pages/MortgageCalculator";
import VirtualStaging from "./pages/VirtualStaging";
import SchoolSearch from "./pages/SchoolSearch";
import CompareNeighborhoods from "./pages/CompareNeighborhoods";
import HouseDirectionFinder from "./pages/HouseDirectionFinder";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import LocalLandmarks from "./pages/LocalLandmarks";
import { Privacy, Terms } from "./pages/Legal";
import BuyerInquiry from "./pages/BuyerInquiry";
import SellerInquiry from "./pages/SellerInquiry";
import RelocationGuide from "./pages/RelocationGuide";
import LandInvestment from "./pages/LandInvestment";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function PublicSite() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/communities" component={Communities} />
        <Route path="/communities/:slug" component={CommunityDetail} />
        <Route path="/buy" component={Buy} />
        <Route path="/sell" component={Sell} />
        <Route path="/home-valuation" component={HomeValuation} />
        <Route path="/buyer-inquiry" component={BuyerInquiry} />
        <Route path="/seller-inquiry" component={SellerInquiry} />
        <Route path="/relocation-guide" component={RelocationGuide} />
        <Route path="/land-investment" component={LandInvestment} />
        <Route path="/ai-home-search" component={AIHomeSearch} />
        <Route path="/concierge" component={Concierge} />
        <Route path="/property-alerts" component={PropertyAlerts} />
        <Route path="/mortgage-calculator" component={MortgageCalculator} />
        <Route path="/virtual-staging" component={VirtualStaging} />
        <Route path="/school-search" component={SchoolSearch} />
        <Route path="/compare-neighborhoods" component={CompareNeighborhoods} />
        <Route path="/house-direction-finder" component={HouseDirectionFinder} />
        <Route path="/tools" component={Tools} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/:slug" component={ResourceDetail} />
        <Route path="/local-landmarks" component={LocalLandmarks} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin (outside public layout) */}
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      {/* Public site */}
      <Route component={PublicSite} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
