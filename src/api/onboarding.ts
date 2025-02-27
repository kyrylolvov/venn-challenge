import { Onboarding } from "~/components/onboarding-form";

import instance from "./instance";

export const validateCorporationNumber = async (corporationNumber: string) => {
  try {
    return await instance.get<{ valid: boolean }>(`/corporation-number/${corporationNumber}`);
  } catch (error) {
    console.log(`[VALIDATE CORPORATION NUMBER]: ${error}`);
    throw error;
  }
};

export const onboardingProfileDetails = async (values: Onboarding) => {
  try {
    return await instance.post(`/profile-details`, values);
  } catch (error) {
    console.log(`[ONBOARDING PROFILE DETAILS]: ${error}`);
    throw error;
  }
};
