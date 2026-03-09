import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, Shield } from "lucide-react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "sonner";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id.apps.googleusercontent.com";

const LoginPage = () => {
  const { login, loginAsAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state, default to /profile
  const from = (location.state as any)?.from || "/profile";

  if (isLoggedIn) {
    navigate(from);
    return null;
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // TODO: Send credentialResponse.credential to backend
      // const response = await fetch(`${API_URL}/api/auth/google`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: credentialResponse.credential })
      // });
      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      
      // For now, use mock login
      console.log("Google credential:", credentialResponse.credential);
      toast.success("Google Sign-In successful!");
      login();
      navigate(from);
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed");
  };

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold mb-3 animate-fade-in-down">Welcome Back</h1>
          <p className="font-body text-muted-foreground animate-fade-in-up stagger-1">Sign in to access your orders and reservations</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-4 hover-lift animate-scale-in">
          {/* Google Sign-In */}
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
                width="100%"
              />
            </div>
          </GoogleOAuthProvider>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground font-body">or for demo</span></div>
          </div>

          <Button onClick={() => { login(); navigate(from); }} variant="outline" className="w-full font-body gap-2">
            <LogIn className="w-4 h-4" /> Mock User Login
          </Button>

          <Button onClick={() => { loginAsAdmin(); navigate("/admin"); }} variant="outline" className="w-full font-body gap-2">
            <Shield className="w-4 h-4" /> Mock Admin Login
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground font-body mt-6">
          By signing in, you agree to our <a href="/terms" className="text-primary hover:underline">Terms</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
