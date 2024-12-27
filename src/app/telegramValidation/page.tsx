"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TelegramValidationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [step, setStep] = useState<"phone" | "code" | "password">("phone");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tlAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "sendCode",
          phoneNumber,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setSessionId(data.sessionId);
      setStep("code");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send code");
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tlAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "verifyCode",
          sessionId,
          phoneCode,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      if (data.requiresPassword) {
        setStep("password");
      } else {
        console.log(data);
        //onLoginComplete(data.session);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to verify code",
      );
    }
    setLoading(false);
  };

  const handleProvide2FA = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tlAuth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "provide2FA",
          sessionId,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      //onLoginComplete(data.session);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to verify 2FA");
    }
    setLoading(false);
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Telegram Login</CardTitle>
        <CardDescription>
          {step === "phone" && "Enter your phone number to start"}
          {step === "code" && "Enter the code sent to your phone"}
          {step === "password" && "Enter your 2FA password"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === "phone" && (
          <div className="space-y-4">
            <Input
              type="tel"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleSendCode}
              disabled={!phoneNumber || loading}
              className="w-full"
            >
              {loading ? "Sending..." : "Send Code"}
            </Button>
          </div>
        )}

        {step === "code" && (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter code"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleVerifyCode}
              disabled={!phoneCode || loading}
              className="w-full"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </div>
        )}

        {step === "password" && (
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="2FA Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleProvide2FA}
              disabled={!password || loading}
              className="w-full"
            >
              {loading ? "Verifying..." : "Submit Password"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
