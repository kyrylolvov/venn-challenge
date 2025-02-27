import OnboardingForm from "~/components/onboarding-form";

export default function Home() {
  return (
    <div className="flex w-full max-w-[768px] flex-col gap-[96px]">
      <h1 className="text-center text-2xl font-normal">Step 1 of 5</h1>
      <div className="bg-background-accent border-secondary flex w-full flex-col gap-8 rounded-lg border p-8">
        <h2 className="text-center text-3xl">Onboarding Form</h2>

        <OnboardingForm />
      </div>
    </div>
  );
}
