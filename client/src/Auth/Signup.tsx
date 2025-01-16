import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/signup`,
        { email, password }
      );

      const data = response.data;
      if (data?.success) {
        toast.success("Successfully signed up!");
        navigate("/login");
      } else {
        toast.error(data?.message || "Signup failed. Please try again.");
      }
    } catch (err: any) {
      toast.error("Something went wrong during signup:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Base background with ultra-dark symmetric gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-750 via-black via-black to-purple-90" />

      {/* Additional darker purple layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0628] via-transparent via-transparent to-[#1b012d] opacity-90" />

      {/* Animated gradient orbs for subtle effect */}
      <motion.div
        className="absolute -left-20 top-1/4 w-96 h-96 bg-purple-950 rounded-full opacity-5 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -right-20 top-1/4 w-96 h-96 bg-purple-980 rounded-full opacity-5 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 h-full flex justify-center items-center ">
        <div className="">
          {/* <Signup/> */}

          <div className="[w-450px] mx-10">
            <div className="container min-h-screen flex flex-col justify-center items-center  lg:max-w-none lg:px-0">
              <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                  <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-tr  from-purple-300/80 to-white/90 bg-clip-text text-transparent">
                      Create an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Enter your email below to create your account
                    </p>
                  </div>
                  <div className="grid gap-6">
                    <form onSubmit={handleSignup}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email" className="text-white">Email</Label>
                          <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={loading}
                            className="border-slate-800 text-white "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {/* {errors.email && <p className="text-sm text-red-500">{errors.email}</p>} */}
                        </div>
                        <div className="grid ">
                          <Label htmlFor="password" className="text-white">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            disabled={loading}
                            value={password}
                            className="border-slate-800 text-white mt-2 "
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {/* {errors.password && <p className="text-sm text-red-500">{errors.password}</p>} */}
                        </div>
                        <Button
                          className="bg-[#5E43EC] hover:bg-[#4930c9] text-gray-100"
                          disabled={loading}
                        >
                          {loading && (
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 )}
                          Sign Up
                        </Button>
                      </div>
                    </form>
                  </div>
                  <p className="px-8 text-center text-sm text-muted-foreground">
                    By signing up, you are agreeing to our{" "}
                    <Link
                      to="/tos"
                      className="hover:text-brand underline hover:text-gray-200 underline-offset-4"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="hover:text-brand hover:text-gray-200 underline underline-offset-4"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                      to="/login"
                      className="hover:text-brand hover:text-gray-200 underline underline-offset-4"
                    >
                      Already have an account? Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
