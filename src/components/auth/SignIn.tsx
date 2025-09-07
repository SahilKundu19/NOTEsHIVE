import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Separator } from "../ui/separator";
import { Loader2, Moon, Sun, FileText, Eye, EyeOff } from "lucide-react";

interface SignInProps {
  onSwitchToSignUp: () => void;
}

export function SignIn({ onSwitchToSignUp }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveAccount, setSaveAccount] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md"
        style={{ width: "500px", height: "600px" }}
      >
        <div
          className="backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl p-8 shadow-xl shadow-black/5"
          style={{ padding: "32px", height: "600px", borderRadius: "1rem" }}
        >
          <div className="space-y-6" style={{ height: "100%" }}>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#2563eb" }}
                >
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  NOTEsHIVE
                </span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center space-y-2">
              <h1 style={{ fontSize: "1.75rem", fontWeight: 600 }}>Sign in</h1>
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={onSwitchToSignUp}
                  className="text-foreground hover:underline font-medium"
                  disabled={loading}
                >
                  Create now
                </button>
              </p>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              style={{ paddingTop: "1.5rem" }}
            >
              {/* Email */}
              <div className="space-y-2" style={{ paddingBottom: "1.5rem" }}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="bg-input-background border-0"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2" style={{ paddingBottom: "1.5rem" }}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    className="bg-input-background border-0 pr-10"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Save Account and Forgot Password */}
              <div
                className="flex items-center justify-between"
                style={{ paddingBottom: "1.5rem" }}
              >
                <div
                  className="space-x-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Checkbox
                    id="saveAccount"
                    checked={saveAccount}
                    onCheckedChange={setSaveAccount}
                  />
                  <Label
                    htmlFor="saveAccount"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Save account
                  </Label>
                </div>
                <button
                  type="button"
                  className="text-sm text-foreground hover:underline"
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div
              className="relative"
              style={{ paddingBottom: "1.75rem", paddingTop: "1.75rem" }}
            >
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-muted-foreground text-sm">
                  OR
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDarkMode}
        className="h-9 w-9 p-0"
        style={{ position: "absolute", top: "16px", right: "16px" }}
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
