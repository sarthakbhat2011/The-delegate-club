"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  X, Square, Minus, FileText, CheckCircle2, ChevronRight, 
  ArrowLeft, ArrowRight, ShieldAlert 
} from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  university: z.string().min(2, "University is required"),
  interests: z.array(z.string()).min(1, "Select at least one event"),
  essay: z.string().min(50, "Please write at least 50 characters explaining why you want to join."),
});

type FormData = z.infer<typeof formSchema>;

const events = ["Model UN", "Hackathons", "Shark Tank", "Charity Auctions"];

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Clock Update (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { register, handleSubmit, formState: { errors, isValid }, trigger, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      interests: [],
    }
  });

  const selectedInterests = watch("interests");

  const toggleInterest = (event: string) => {
    const current = selectedInterests || [];
    if (current.includes(event)) {
      setValue("interests", current.filter(i => i !== event), { shouldValidate: true });
    } else {
      setValue("interests", [...current, event], { shouldValidate: true });
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: any = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "university"];
    if (step === 2) fieldsToValidate = ["interests"];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate secure API call delay
    await new Promise(resolve => setTimeout(resolve, 1800));
    console.log("Submitting credentials to High Council:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="retro-window-outset max-w-2xl mx-auto rounded-lg border-2 border-black flex flex-col shadow-[8px_8px_0px_rgba(0,0,0,1)] text-black select-none"
      >
        {/* Success Dialog Title */}
        <div className="px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r from-emerald-700 to-emerald-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-wider">SUCCESS // COUNCIL CHARTER ISSUED</span>
          </div>
          <Link href="/" className="w-4 h-4 rounded border border-black flex items-center justify-center text-[9px] bg-[#c0c0c0] text-black hover:bg-red-500 hover:text-white">
            ✕
          </Link>
        </div>

        <div className="bg-[#dfdfdf] p-8 text-center flex flex-col items-center gap-6 border-t border-white">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-black flex items-center justify-center font-bold text-3xl shadow-[3px_3px_0px_rgba(0,0,0,1)] text-emerald-700">
            ✓
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-black text-emerald-800 uppercase tracking-wide">
              BY ROYAL DECREE
            </h2>
            <p className="text-sm font-sans text-gray-700 font-bold max-w-md mx-auto leading-relaxed">
              Your strategy application has been successfully logged. The High Council of Ministers will inspect your credentials shortly.
            </p>
          </div>

          <div className="retro-window-inset p-3 bg-white border border-gray-400 font-mono text-[10px] text-black space-y-1 w-full max-w-md text-left">
            <p>• <strong>STATUS:</strong> QUEUED_FOR_INDUCTION</p>
            <p>• <strong>VERIFICATION:</strong> SECURE MERIT PROTOCOL PASS [OK]</p>
          </div>

          <div className="border-t border-[#808080] pt-4 w-full flex justify-center">
            <Link 
              href="/"
              className="retro-button px-6 py-2 text-xs font-mono font-bold uppercase text-black border border-black hover:bg-[#c0c0c0]"
            >
              Return to desktop
            </Link>
          </div>
        </div>

        <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
          <span>Charter Signed</span>
          <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="retro-window-outset max-w-2xl mx-auto rounded-lg border-2 border-[var(--color-brand-cyber-purple)] flex flex-col shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-shadow duration-300 text-black select-none">
      
      {/* Title Bar */}
      <div className="px-3 py-1.5 flex justify-between items-center text-white font-mono bg-gradient-to-r from-[var(--color-brand-terracotta)] via-[#db2777] to-[var(--color-brand-cyber-purple)]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">APPLY.EXE // Strategy Assembly Request</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0">
            <Minus className="w-3 h-3 stroke-[3]" />
          </button>
          <button className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 cursor-not-allowed" disabled>
            <Square className="w-2.5 h-2.5 stroke-[3]" />
          </button>
          <Link href="/" className="w-5 h-5 retro-button flex items-center justify-center text-black font-bold p-0 hover:bg-red-600 hover:text-white">
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </Link>
        </div>
      </div>

      {/* Options Menu Bar */}
      <div className="bg-[#c0c0c0] px-3 py-1 border-b border-[#808080] flex justify-between items-center text-[10px] font-mono text-black font-medium border-t border-white select-none">
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">File</span>
          <span className="hover:underline cursor-pointer">Security</span>
          <span className="hover:underline cursor-pointer">Help</span>
        </div>
        {/* Cyber status pill */}
        <div className="flex items-center gap-1 bg-black/90 border border-emerald-400 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] font-bold shadow-[0_0_8px_rgba(52,211,153,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>CYBER_SHIELD: ACTIVE</span>
        </div>
      </div>

      {/* Form Workspace */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#dfdfdf] p-6 flex flex-col gap-6 border-t border-white">
        
        {/* Step Progress block styled like a Windows 95 installer */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-700 font-bold uppercase">
            <span>Assembly Wizard Progress:</span>
            <span>Step {step} of 3</span>
          </div>

          <div className="flex gap-1.5 border border-gray-400 p-1 bg-white rounded shadow-inner">
            {Array.from({ length: 3 }).map((_, idx) => {
              const active = step >= idx + 1;
              return (
                <div 
                  key={idx} 
                  className={`h-4.5 flex-grow transition-colors ${active ? "bg-[#000080]" : "bg-gray-200"}`} 
                />
              );
            })}
          </div>
        </div>

        {/* Dynamic form steps */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Basic Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 font-mono text-xs text-black"
              >
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black block border-b border-gray-300 pb-1 mb-2">
                  Verify Diplomatic Profile
                </span>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Full Name, Your Excellency:</label>
                  <input 
                    {...register("fullName")}
                    className="w-full retro-window-inset bg-white border border-gray-400 p-2.5 rounded text-black outline-none focus:border-[var(--color-brand-electric-blue)] focus:ring-1 focus:ring-[var(--color-brand-electric-blue)] focus:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-mono"
                    placeholder="e.g. Eleanor Sterling"
                  />
                  {errors.fullName && <p className="text-red-700 text-[10px] mt-1 font-bold">⚠️ {errors.fullName.message}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Electronic Mail address:</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className="w-full retro-window-inset bg-white border border-gray-400 p-2.5 rounded text-black outline-none focus:border-[var(--color-brand-electric-blue)] focus:ring-1 focus:ring-[var(--color-brand-electric-blue)] focus:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-mono"
                    placeholder="eleanor@court.edu"
                  />
                  {errors.email && <p className="text-red-700 text-[10px] mt-1 font-bold">⚠️ {errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">Institution / University of Study:</label>
                  <input 
                    {...register("university")}
                    className="w-full retro-window-inset bg-white border border-gray-400 p-2.5 rounded text-black outline-none focus:border-[var(--color-brand-electric-blue)] focus:ring-1 focus:ring-[var(--color-brand-electric-blue)] focus:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-mono"
                    placeholder="e.g. Oxford University"
                  />
                  {errors.university && <p className="text-red-700 text-[10px] mt-1 font-bold">⚠️ {errors.university.message}</p>}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Interests Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 font-mono text-xs text-black"
              >
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black block border-b border-gray-300 pb-1 mb-2">
                  Select Target Chambers
                </span>
                
                <label className="block font-bold text-gray-700 uppercase text-center mb-2">
                  Which chambers command your strategic interest?
                </label>
                
                <div className="flex flex-wrap gap-3.5 justify-center">
                  {events.map((evt) => {
                    const isSelected = selectedInterests?.includes(evt);
                    return (
                      <button
                        type="button"
                        key={evt}
                        onClick={() => toggleInterest(evt)}
                        className={`retro-button px-5 py-2 text-xs font-mono font-bold uppercase border border-black cursor-pointer flex items-center gap-1.5 transition-colors ${
                          isSelected 
                            ? 'bg-[var(--color-brand-electric-blue)] text-white shadow-inner translate-x-[1px] translate-y-[1px]'
                            : 'bg-transparent text-black hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-[10px]">{isSelected ? "☑" : "☐"}</span>
                        <span>{evt}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.interests && <p className="text-red-700 text-[10px] mt-2 text-center font-bold">⚠️ {errors.interests.message}</p>}
              </motion.div>
            )}

            {/* STEP 3: Essay Decree */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 font-mono text-xs text-black"
              >
                <span className="text-[10px] font-mono text-gray-500 uppercase font-black block border-b border-gray-300 pb-1 mb-2">
                  Draft Strategy Statement
                </span>

                <div className="space-y-1">
                  <label className="block font-bold text-gray-700 uppercase">
                    Why should the High Council grant you a seat? (Min 50 chars):
                  </label>
                  <textarea 
                    {...register("essay")}
                    rows={6}
                    className="w-full retro-window-inset bg-white border border-gray-400 p-3 rounded text-black outline-none focus:border-[var(--color-brand-electric-blue)] focus:ring-1 focus:ring-[var(--color-brand-electric-blue)] focus:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all font-mono resize-none"
                    placeholder="Draft your assembly decree statement..."
                  />
                  {errors.essay && <p className="text-red-700 text-[10px] mt-1 font-bold">⚠️ {errors.essay.message}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Controls Footer */}
        <div className="border-t border-[#808080] pt-4 flex justify-between select-none">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={prevStep}
              className="retro-button px-5 py-2 text-xs font-mono font-bold uppercase text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="retro-button px-6 py-2 text-xs font-mono font-bold uppercase text-black border border-black hover:bg-[#c0c0c0] cursor-pointer flex items-center gap-1.5 ml-auto"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button 
              type="submit"
              disabled={!isValid || isSubmitting}
              className="retro-button px-6 py-2 text-xs font-mono font-bold uppercase text-black border border-black hover:bg-emerald-600 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-wait ml-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Decree"}
            </button>
          )}
        </div>

      </form>

      {/* Window Footer Status bar */}
      <div className="bg-[#c0c0c0] px-3 py-1 border-t border-[#808080] text-[9px] font-mono text-black flex justify-between border-b border-white select-none">
        <span>Application Wizard Connected</span>
        <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
      </div>

    </div>
  );
}
