import { z } from "zod";

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

// Authentication validation
export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z.string().min(1, "Password is required"),
});

// Admin form validations
export const subjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Subject name must be at least 3 characters")
    .max(100, "Subject name must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export const pdfSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "PDF title must be at least 5 characters")
    .max(200, "PDF title must be less than 200 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  subjectId: z.string().uuid("Invalid subject selected"),
  file: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", "File must be a PDF")
    .refine((file) => file.size <= 50 * 1024 * 1024, "PDF must be less than 50MB"),
});

export const videoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Video title must be at least 5 characters")
    .max(200, "Video title must be less than 200 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  subjectId: z.string().uuid("Invalid subject selected"),
  youtubeUrl: z
    .string()
    .trim()
    .url("Invalid URL format")
    .regex(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      "Must be a valid YouTube URL"
    ),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SubjectFormData = z.infer<typeof subjectSchema>;
export type PdfFormData = z.infer<typeof pdfSchema>;
export type VideoFormData = z.infer<typeof videoSchema>;
