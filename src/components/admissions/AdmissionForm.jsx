"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitAdmissionForm } from "@/app/actions/admission";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  gradeApplied: z.string().min(1, "Class/Grade is required"),
  parentName: z.string().min(2, "Parent name is required"),
  parentEmail: z.string().email("Invalid email address"),
  parentPhone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Complete address is required"),
});

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(admissionSchema),
  });

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["studentName", "dateOfBirth", "gender", "gradeApplied"];
    if (step === 2) fieldsToValidate = ["parentName", "parentEmail", "parentPhone", "address"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const result = await submitAdmissionForm(JSON.stringify(data));
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(result.error);
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl shadow-xl border border-success/20"
      >
        <div className="h-20 w-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-bold font-poppins text-foreground mb-4">Application Submitted!</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Thank you for applying to Holy Fathima Kidz High School. Our admissions team will review your application and contact you shortly.
        </p>
        <Button onClick={() => window.location.href = "/"} size="lg" className="rounded-full px-8">
          Return to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-muted/50 p-4 border-b">
        <div className="flex justify-between mb-2 px-2">
          {["Student Details", "Parent Details"].map((label, i) => (
            <span key={i} className={`text-xs font-semibold ${step >= i + 1 ? "text-primary" : "text-muted-foreground"}`}>
              Step {i + 1}: {label}
            </span>
          ))}
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "50%" }}
            animate={{ width: `${(step / 2) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-poppins font-semibold border-b pb-2 mb-6 text-foreground">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Full Name of Student</Label>
                    <Input id="studentName" {...register("studentName")} placeholder="John Doe" />
                    {errors.studentName && <span className="text-xs text-destructive">{errors.studentName.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                    {errors.dateOfBirth && <span className="text-xs text-destructive">{errors.dateOfBirth.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select id="gender" {...register("gender")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <span className="text-xs text-destructive">{errors.gender.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradeApplied">Class / Grade Applied For</Label>
                    <select id="gradeApplied" {...register("gradeApplied")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <option value="">Select Class</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                    {errors.gradeApplied && <span className="text-xs text-destructive">{errors.gradeApplied.message}</span>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-poppins font-semibold border-b pb-2 mb-6 text-foreground">Parent / Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent / Guardian Name</Label>
                    <Input id="parentName" {...register("parentName")} placeholder="Jane Doe" />
                    {errors.parentName && <span className="text-xs text-destructive">{errors.parentName.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input id="parentEmail" type="email" {...register("parentEmail")} placeholder="jane@example.com" />
                    {errors.parentEmail && <span className="text-xs text-destructive">{errors.parentEmail.message}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number</Label>
                    <Input id="parentPhone" type="tel" {...register("parentPhone")} placeholder="+91 98765 43210" />
                    {errors.parentPhone && <span className="text-xs text-destructive">{errors.parentPhone.message}</span>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <Input id="address" {...register("address")} placeholder="Full address" />
                    {errors.address && <span className="text-xs text-destructive">{errors.address.message}</span>}
                  </div>
                </div>
              </motion.div>
            )}


          </AnimatePresence>

          {errorMsg && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {errorMsg}
            </div>
          )}

          <div className="flex justify-between pt-6 border-t mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step === 1 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {step < 2 ? (
              <Button type="button" onClick={handleNext}>
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</>
                ) : (
                  <><CheckCircle2 className="mr-2 h-4 w-4" /> Submit Application</>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
