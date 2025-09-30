"use client";

import { useState, ReactNode } from "react";

interface Step {
  label: string;
  content: ReactNode;
  onNext: () => boolean | Promise<boolean>;
  onPrev?: () => boolean | Promise<boolean>;
}

interface StepperProps {
  steps: Step[];
  onSubmit: () => void;
  submitLabel?: string;
  className?: string;
}

export default function Stepper({ steps, onSubmit, submitLabel = "Submit", className="" }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async () => {
    if (currentStep === steps.length - 1) return onSubmit();

    if (currentStep < steps.length - 1) {
        const canProceed = await steps[currentStep].onNext();
        if (canProceed) setCurrentStep((prev) => prev + 1);
    }
    return;
  };

  const handlePrev = async () => {
    if (currentStep > 0) {
        let canGoBack = true;
        if (steps[currentStep].onPrev)
            canGoBack = await steps[currentStep].onPrev();

        if (canGoBack) setCurrentStep((prev) => prev - 1);
    }
    return;
  };

  return (
    <div className={`w-full mx-auto ${className}`}>
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold
                  ${index === currentStep
                    ? "bg-teal-400"
                    : index < currentStep
                    ? "bg-blue-400"
                    : "bg-gray-300"
                  }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-[12px] font-semibold text-center">{step.label}</span>
            </div>
            {index <= steps.length - 1 && (
              <div
                className={`h-0.5 mt-2 transition-all duration-300
                  ${index < currentStep ? "bg-blue-400" : (
                    index === currentStep ? "bg-teal-400" : "bg-gray-300"
                  )}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="stepper-contents">{steps[currentStep].content}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-5 py-2 rounded-md font-medium text-[12px] transition cursor-pointer
            ${currentStep === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className={`px-5 py-2 rounded-md font-medium text-[12px] transition cursor-pointer
            ${currentStep === steps.length - 1
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-teal-400 text-white hover:bg-teal-500"
            }`}
        >
            {
                currentStep === steps.length - 1
                    ? submitLabel
                    : "Next"
            }
        </button>
      </div>
    </div>
  );
}
