"use client";

import { useState, ReactNode } from "react";

interface Step {
  label: string;
  content: ReactNode;
  onNext?: () => boolean | Promise<boolean>;
  onPrev?: () => boolean | Promise<boolean>;
}

interface StepperProps {
  steps: Step[];
  onSubmit?: () => void | Promise<void>;
  submitLabel?: string;
  className?: string;
}

export default function Stepper({
  steps,
  onSubmit,
  submitLabel = "Submit",
  className = "",
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLastStep = currentStep === steps.length - 1;

  const handleNext = async () => {
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const step = steps[currentStep];
      let canProceed = true;

      if (step.onNext) canProceed = await step.onNext();

      if (canProceed) {
        if (isLastStep) {
          if (onSubmit) await onSubmit();
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = async () => {
    if (loading || currentStep === 0) return;

    setError(null);
    setLoading(true);

    try {
      const step = steps[currentStep];
      let canGoBack = true;

      if (step.onPrev) canGoBack = await step.onPrev();
      if (canGoBack) setCurrentStep((prev) => prev - 1);
    } catch (err) {
      console.error(err);
      setError("Failed to go back. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className="flex items-center justify-between mb-8 relative">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold transition-all
                    ${isActive
                      ? "bg-teal-500 scale-110"
                      : isCompleted
                      ? "bg-blue-500"
                      : "bg-gray-300"
                    }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-[12px] font-semibold text-center ${
                    isActive ? "text-teal-600" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-[50%] w-full h-[2px] -z-10 transition-all duration-500
                    ${isCompleted ? "bg-blue-500" : "bg-gray-300"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[200px]">{steps[currentStep].content}</div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0 || loading}
          className={`px-5 py-2 rounded-md font-medium text-[13px] transition 
            ${currentStep === 0 || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={loading}
          className={`px-5 py-2 rounded-md font-medium text-[13px] transition flex items-center gap-2
            ${isLastStep
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-teal-400 text-white hover:bg-teal-500"
            } ${loading ? "opacity-70 cursor-wait" : ""}`}
        >
          {loading ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : isLastStep ? (
            submitLabel
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
}
