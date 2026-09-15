//

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/api";
import {
  therapistSchema,
  type TherapistFormValues,
} from "../lib/therapistSchema";
import type { Therapist } from "../types/therapist";
import { Loader2 } from "lucide-react";

interface TherapistFormProps {
  therapist?: Therapist | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TherapistForm({
  therapist,
  onSuccess,
  onCancel,
}: TherapistFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<TherapistFormValues>({
    resolver: zodResolver(therapistSchema),
    defaultValues: {
      fullName: "",
      title: "",
      degrees: "",
      phone: "",
      email: "",
      specialization: "",
      category: "knee",
      bio: "",
      clinicalFocus: "",
      experienceYears: 0,
      rating: 4.9,
      reviewCount: 0,
      pricePerSession: 0,
      matchScore: 0,
      avatarUrl: "",
      clinicLocation: "",
      focusTags: "",
      availableSlots: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (therapist) {
      reset({
        fullName: therapist.fullName,
        title:  therapist.title ?? "",
        degrees: therapist.degrees ?? "",
        phone: therapist.phone,
        email: therapist.email ?? "",
        specialization: therapist.specialization,
        category: therapist.category ?? "knee", 
        bio: therapist.bio ?? "",
        clinicalFocus: therapist.clinicalFocus ?? "",
        experienceYears: therapist.experienceYears ?? 0,
         rating: therapist.rating ? Number(therapist.rating) : null,
        reviewCount: therapist.reviewCount ?? 0,
        pricePerSession: therapist.pricePerSession ? Number(therapist.pricePerSession) : null,
        matchScore: therapist.matchScore ? Number(therapist.matchScore) : null,
        avatarUrl: therapist.avatarUrl ?? "",
        clinicLocation: therapist.clinicLocation ?? "",
        focusTags: therapist.focusTags?.join(", ") ?? "",
        availableSlots: therapist.availableSlots?.join(", ") ?? "",
      });
    } else {
      reset({
        fullName: "",
        title: "",
        degrees: "",
        phone: "",
        email: "",
        specialization: "",
        category: "knee",
        bio: "",
        clinicalFocus: "",
        experienceYears: 0,
        rating: 4.9,
        reviewCount: 0,
        pricePerSession: 0,
        matchScore: 0,
        avatarUrl: "",
        clinicLocation: "",
        focusTags: "",
        availableSlots: "",
      });
    }
  }, [therapist, reset]);

  const onSubmit = async (values: TherapistFormValues) => {
    setServerError(null);

    try {
      const parseArray = (str: string | null | undefined) =>
        str
          ? str
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [];

      const payload = {
        fullName: values.fullName,
        title: values.title,
        degrees: values.degrees || undefined,
        phone: values.phone,
        email: values.email || undefined,
        specialization: values.specialization,
        category: values.category,
        bio: values.bio || undefined,
        clinicalFocus: values.clinicalFocus || undefined,

        experienceYears: values.experienceYears ?? undefined,
        rating: values.rating ?? undefined,
        reviewCount: values.reviewCount ?? undefined,
        pricePerSession: values.pricePerSession ?? undefined,
        matchScore: values.matchScore ?? undefined,

        avatarUrl: values.avatarUrl || undefined,
        clinicLocation: values.clinicLocation || undefined,

        focusTags: parseArray(values.focusTags),
        availableSlots: parseArray(values.availableSlots),
      };

      if (therapist) {
        // EDIT
        await api.patch(`/therapists/${therapist.id}`, payload);
      } else {
        // CREATE
        await api.post("/therapists", payload);
      }

      onSuccess();
    } catch (err: any) {
      const message =
        err.message ||
        "Failed to save specialist. Please check the data and try again.";

      setServerError(message);
      setError("root", { message });
    }
  };

  const FormInput = ({
    label,
    id,
    error,
    type = "text",
    placeholder,
    required,
    ...props
  }: any) => (
    <div>
      <label className="block text-xs font-clinical-mono uppercase text-neutral-600 mb-1.5">
        {label} {required && "*"}
      </label>

      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all ${
          error ? "border-red-500 bg-red-50" : "border-neutral-300"
        }`}
        placeholder={placeholder}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-600">{String(error)}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <span>⚠️</span>
          {serverError}
        </div>
      )}

      {/* Section 1: Basic Identity */}
      <div className="space-y-4">
        <h3 className="font-editorial-serif text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          Basic Identity
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            id="fullName"
            {...register("fullName")}
            error={errors.fullName?.message}
            required
          />

          <FormInput
            label="Professional Title"
            id="title"
            {...register("title")}
            error={errors.title?.message}
            placeholder="e.g., Orthopedic & Sports Physiotherapy"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Degrees"
            id="degrees"
            {...register("degrees")}
            placeholder="e.g., DPT, OCS, CSCS"
          />

          <FormInput
            label="Phone"
            id="phone"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
            required
          />
        </div>

        <FormInput
          label="Email"
          id="email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="therapist@example.com"
        />
      </div>

      {/* Section 2: Clinical Details */}
      <div className="space-y-4">
        <h3 className="font-editorial-serif text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          Clinical Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Specialization"
            id="specialization"
            {...register("specialization")}
            error={errors.specialization?.message}
            required
          />

          <div>
            <label className="block text-xs font-clinical-mono uppercase text-neutral-600 mb-1.5">
              Primary Category *
            </label>

            <select
              {...register("category")}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
            >
              <option value="knee">Knee & Patellofemoral</option>
              <option value="spine">Lumbar & Axial Spine</option>
              <option value="shoulder">Shoulder & Glenohumeral</option>
              <option value="hip">Hip & Acetabulofemoral</option>
              <option value="ankle">Ankle & Subtalar Complex</option>
              <option value="cervical">Cervical & Craniovertebral</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-red-600">
                {String(errors.category.message)}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-clinical-mono uppercase text-neutral-600 mb-1.5">
            Clinical Biography
          </label>

          <textarea
            {...register("bio")}
            rows={3}
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-clinical-mono uppercase text-neutral-600 mb-1.5">
            Clinical Focus
          </label>

          <textarea
            {...register("clinicalFocus")}
            rows={2}
            placeholder="e.g., Patellofemoral tracking disorders, high-speed deceleration..."
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Section 3: Metrics & Availability */}
      <div className="space-y-4">
        <h3 className="font-editorial-serif text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-2">
          Metrics & Availability
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormInput
            label="Exp. (Years)"
            id="experienceYears"
            type="number"
            {...register("experienceYears", {
              valueAsNumber: true,
            })}
          />

          <FormInput
            label="Rating (0-5)"
            id="rating"
            type="number"
            step="0.1"
            {...register("rating", {
              valueAsNumber: true,
            })}
          />

          <FormInput
            label="Reviews"
            id="reviewCount"
            type="number"
            {...register("reviewCount", {
              valueAsNumber: true,
            })}
          />

          <FormInput
            label="Price (₹)"
            id="pricePerSession"
            type="number"
            {...register("pricePerSession", {
              valueAsNumber: true,
            })}
          />
        </div>

        <FormInput
          label="Match Score"
          id="matchScore"
          type="number"
          {...register("matchScore", {
            valueAsNumber: true,
          })}
        />

        <FormInput
          label="Focus Tags"
          id="focusTags"
          {...register("focusTags")}
          placeholder="Running injuries, ACL rehab, Sports physio (comma-separated)"
        />

        <FormInput
          label="Available Slots"
          id="availableSlots"
          {...register("availableSlots")}
          placeholder="5:30 PM, 6:30 PM, 7:15 PM (comma-separated)"
        />

        <FormInput
          label="Avatar URL"
          id="avatarUrl"
          {...register("avatarUrl")}
          error={errors.avatarUrl?.message}
          placeholder="https://..."
        />

        <FormInput
          label="Clinic Location"
          id="clinicLocation"
          {...register("clinicLocation")}
          placeholder="e.g., Bandra West Movement Lab, Mumbai"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-neutral-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#181816] hover:bg-[#2A2A26] text-[#F9F8F5] font-bold py-3 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}

          {isSubmitting
            ? "Saving..."
            : therapist
              ? "Save Changes"
              : "Create Specialist"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold py-3 rounded-xl text-sm disabled:opacity-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
