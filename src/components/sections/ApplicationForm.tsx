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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  university: z.string().min(2, "University is required"),
  interests: z.array(z.string()).min(1, "Select at least one event"),
  essay: z.string().min(50, "Please write at least 50 characters explaining why you want to join."),
});

type FormData = z.infer<typeof formSchema>;

const events = ["Model UN", "Hackathons", "Shark Tank", "Charity Auctions", "Sufi Nights"];

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
        className="stained-glass max-w-2xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 flex flex-col shadow-2xl text-foreground select-none overflow-hidden"
      >
        {/* Success Dialog Title */}
        <div className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
            <span className="text-xs font-black uppercase tracking-widest">SUCCESS // COUNCIL CHARTER ISSUED</span>
          </div>
          <Link href="/" className="w-5 h-5 rounded-lg bg-white/20 hover:bg-rose-600 flex items-center justify-center text-white border border-white/10 transition-colors">
            ✕
          </Link>
        </div>

        <div className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-8 text-center flex flex-col items-center gap-6 border-t border-black/5 dark:border-white/5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-3xl shadow-sm text-emerald-600 dark:text-emerald-400">
            ✓
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-sans font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              BY ROYAL DECREE
            </h2>
            <p className="text-sm font-sans text-zinc-700 dark:text-zinc-300 font-bold max-w-md mx-auto leading-relaxed">
              Your strategy application has been successfully logged. The High Council of Ministers will inspect your credentials shortly.
            </p>
          </div>

          <div className="bg-black/5 dark:bg-white/5 p-3 rounded-xl border border-black/5 dark:border-white/5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400 space-y-1 w-full max-w-md text-left shadow-inner">
            <p>• <strong>STATUS:</strong> QUEUED_FOR_INDUCTION</p>
            <p>• <strong>VERIFICATION:</strong> SECURE MERIT PROTOCOL PASS [OK]</p>
          </div>

          <div className="border-t border-black/5 dark:border-white/5 pt-4 w-full flex justify-center">
            <Link 
              href="/"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Return to desktop
            </Link>
          </div>
        </div>

        <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none shadow-sm">
          <span>Charter Signed</span>
          <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="stained-glass max-w-2xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 flex flex-col shadow-2xl hover:shadow-[0_0_35px_rgba(225,29,72,0.15)] transition-shadow duration-500 text-foreground select-none overflow-hidden">
      
      {/* Title Bar */}
      <div className="px-4 py-2 flex justify-between items-center text-white bg-gradient-to-r from-rose-500 to-amber-500 shadow-sm">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-white animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white">APPLY.EXE // Strategy Assembly Request</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button className="w-5 h-5 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer">
            <Minus className="w-3 h-3 stroke-[3]" />
          </button>
          <button className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center text-white/40 border border-white/5 cursor-not-allowed" disabled>
            <Square className="w-2.5 h-2.5 stroke-[3]" />
          </button>
          <Link href="/" className="w-5 h-5 rounded-lg bg-white/20 hover:bg-rose-600 flex items-center justify-center text-white border border-white/10 transition-colors">
            <X className="w-3 h-3 stroke-[3]" />
          </Link>
        </div>
      </div>

      {/* Options Menu Bar */}
      <div className="bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md px-4 py-2 border-b border-black/5 dark:border-white/5 flex justify-between items-center text-[10px] font-sans text-black dark:text-zinc-300 font-black uppercase tracking-wider select-none">
        <div className="flex gap-4">
          <span className="hover:text-rose-500 cursor-pointer">File</span>
          <span className="hover:text-rose-500 cursor-pointer">Security</span>
          <span className="hover:text-rose-500 cursor-pointer">Help</span>
        </div>
        {/* Cyber status pill */}
        <div className="flex items-center gap-1.5 bg-black/80 dark:bg-black/90 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-lg text-[8px] font-bold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>CYBER_SHIELD: ACTIVE</span>
        </div>
      </div>

      {/* Form Workspace */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md p-6 flex flex-col gap-6 border-t border-black/5 dark:border-white/5">
        
        {/* Step Progress block styled like a glass installer */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] font-sans text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-wider">
            <span>Assembly Wizard Progress:</span>
            <span>Step {step} of 3</span>
          </div>

          <div className="flex gap-1.5 border border-black/10 dark:border-white/10 p-1 bg-white/40 dark:bg-zinc-900/40 rounded-xl shadow-inner">
            {Array.from({ length: 3 }).map((_, idx) => {
              const active = step >= idx + 1;
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "h-3 flex-grow rounded-md transition-colors duration-300",
                    active ? "bg-rose-500 shadow-sm" : "bg-zinc-200 dark:bg-zinc-800"
                  )}
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
                className="space-y-4 text-xs text-black dark:text-white"
              >
                <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 uppercase font-black block border-b border-black/5 dark:border-white/5 pb-1 mb-2 tracking-wider">
                  Verify Diplomatic Profile
                </span>

                <div className="space-y-1">
                  <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[10px]">Full Name, Your Excellency:</label>
                  <input 
                    {...register("fullName")}
                    className="w-full bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 p-3 rounded-xl text-black dark:text-white outline-none focus:border-rose-500 transition-colors font-sans"
                    placeholder="e.g. Eleanor Sterling"
                  />
                  {errors.fullName && <p className="text-rose-500 text-[10px] mt-1 font-bold">⚠️ {errors.fullName.message}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[10px]">Electronic Mail address:</label>
                  <input 
                    {...register("email")}
                    type="email"
                    className="w-full bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 p-3 rounded-xl text-black dark:text-white outline-none focus:border-rose-500 transition-colors font-sans"
                    placeholder="eleanor@court.edu"
                  />
                  {errors.email && <p className="text-rose-500 text-[10px] mt-1 font-bold">⚠️ {errors.email.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[10px]">Institution / University of Study:</label>
                  <input 
                    {...register("university")}
                    className="w-full bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 p-3 rounded-xl text-black dark:text-white outline-none focus:border-rose-500 transition-colors font-sans"
                    placeholder="e.g. Oxford University"
                  />
                  {errors.university && <p className="text-rose-500 text-[10px] mt-1 font-bold">⚠️ {errors.university.message}</p>}
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
                className="space-y-4 text-xs text-black dark:text-white"
              >
                <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 uppercase font-black block border-b border-black/5 dark:border-white/5 pb-1 mb-2 tracking-wider">
                  Select Target Chambers
                </span>
                
                <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-center mb-2">
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
                        className={cn(
                          "px-5 py-2 text-xs font-black uppercase tracking-widest border rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shadow-sm",
                          isSelected 
                            ? 'bg-rose-500 text-white border-transparent scale-95 shadow-md'
                            : 'bg-white/40 dark:bg-zinc-900/40 border-black/10 dark:border-white/10 text-black dark:text-zinc-300 hover:bg-white/60 dark:hover:bg-zinc-800/60'
                        )}
                      >
                        <span className="text-[10px]">{isSelected ? "☑" : "☐"}</span>
                        <span>{evt}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.interests && <p className="text-rose-500 text-[10px] mt-2 text-center font-bold">⚠️ {errors.interests.message}</p>}
              </motion.div>
            )}

            {/* STEP 3: Essay Decree */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 text-xs text-black dark:text-white"
              >
                <span className="text-[9px] font-sans text-zinc-500 dark:text-zinc-400 uppercase font-black block border-b border-black/5 dark:border-white/5 pb-1 mb-2 tracking-wider">
                  Draft Strategy Statement
                </span>

                <div className="space-y-1">
                  <label className="block font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wider text-[10px] mb-1">
                    Why should the High Council grant you a seat? (Min 50 chars):
                  </label>
                  <textarea 
                    {...register("essay")}
                    rows={6}
                    className="w-full bg-white/60 dark:bg-zinc-900/60 border border-black/10 dark:border-white/10 p-3 rounded-xl text-black dark:text-white outline-none focus:border-rose-500 transition-colors font-sans resize-none"
                    placeholder="Draft your assembly decree statement..."
                  />
                  {errors.essay && <p className="text-rose-500 text-[10px] mt-1 font-bold">⚠️ {errors.essay.message}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Controls Footer */}
        <div className="border-t border-black/5 dark:border-white/5 pt-4 flex justify-between select-none">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={prevStep}
              className="bg-white/40 dark:bg-zinc-900/40 border border-black/10 dark:border-white/10 text-black dark:text-zinc-300 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button 
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-wait ml-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Decree"}
            </button>
          )}
        </div>

      </form>

      {/* Window Footer Status bar */}
      <div className="bg-zinc-300 dark:bg-zinc-900 px-4 py-1.5 text-[9px] font-mono text-zinc-600 dark:text-zinc-400 flex justify-between border-t border-black/5 dark:border-white/5 select-none shadow-sm">
        <span>Application Wizard Connected</span>
        <span>Clock (IST): {currentTime || "12:00:00 PM"}</span>
      </div>

    </div>
  );
}
