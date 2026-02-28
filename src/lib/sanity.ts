import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2024-02-28",
  useCdn: false, // Use false for write operations
  token: import.meta.env.VITE_SANITY_TOKEN
});

// Helper to submit contact form leads
export async function submitLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  return await sanityClient.create({
    _type: "lead",
    ...data,
    submittedAt: new Date().toISOString(),
    status: "new"
  });
}

// Helper to submit property inquiry
export async function submitPropertyInquiry(data: {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
}) {
  return await sanityClient.create({
    _type: "propertyInquiry",
    ...data,
    submittedAt: new Date().toISOString(),
    status: "new"
  });
}

// Helper to submit home valuation request
export async function submitHomeValuation(data: {
  propertyAddress: string;
  city: string;
  zipCode: string;
  email: string;
}) {
  return await sanityClient.create({
    _type: "homeValuation",
    ...data,
    submittedAt: new Date().toISOString(),
    status: "new"
  });
}

// Helper to register user (for tracking only, NOT for authentication)
export async function registerUser(data: {
  fullName: string;
  email: string;
  registrationType: 'email' | 'google' | 'github';
}) {
  return await sanityClient.create({
    _type: "userRegistration",
    ...data,
    registeredAt: new Date().toISOString(),
    status: "active"
  });
}

// Helper to track login attempts (for analytics only, NOT for authentication)
export async function trackLoginAttempt(data: {
  email: string;
  success: boolean;
  ipAddress?: string;
}) {
  return await sanityClient.create({
    _type: "loginAttempt",
    ...data,
    attemptedAt: new Date().toISOString()
  });
}

// Helper to fetch all properties
export async function fetchProperties() {
  return await sanityClient.fetch(
    `*[_type == "property"]{
      _id,
      title,
      price,
      address,
      city,
      state,
      zip,
      beds,
      baths,
      sqft,
      type,
      status,
      images,
      description,
      features,
      neighborhood,
      yearBuilt,
      lotSize
    }`
  );
}

// Helper to fetch single property by ID
export async function fetchPropertyById(id: string) {
  return await sanityClient.fetch(
    `*[_type == "property" && _id == $id][0]{
      _id,
      title,
      price,
      address,
      city,
      state,
      zip,
      beds,
      baths,
      sqft,
      type,
      status,
      images,
      description,
      features,
      neighborhood,
      yearBuilt,
      lotSize
    }`,
    { id }
  );
}
