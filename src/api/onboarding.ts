import instance from "./instance";

export const validateCorporationNumber = async (corporationNumber: string) => {
  try {
    return await instance.get<{ valid: boolean }>(`/corporation-number/${corporationNumber}`);
  } catch (error) {
    console.log(`[VALIDATE CORPORATION NUMBER]: ${error}`);
    throw error;
  }
};
