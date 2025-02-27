import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "bun:test";

import OnboardingForm from "~/components/onboarding-form";

test("<OnboardingForm /> renders correctly with empty inputs", async () => {
  render(<OnboardingForm />);

  const firstNameInput = screen.getByTestId("first-name-input") as HTMLInputElement;
  const lastNameInput = screen.getByTestId("last-name-input") as HTMLInputElement;
  const phoneInput = screen.getByTestId("phone-input") as HTMLInputElement;
  const corporationInput = screen.getByTestId("corporation-input") as HTMLInputElement;

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(corporationInput).toBeInTheDocument();

  expect(firstNameInput.value).toBe("");
  expect(lastNameInput.value).toBe("");
  expect(phoneInput.value).toBe("");
  expect(corporationInput.value).toBe("");
});

test("<OnboardingForm /> renders errors for empty values", async () => {
  render(<OnboardingForm />);

  const submitButton = screen.getByTestId("submit-button");

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    expect(screen.getByText("Corporation number is required")).toBeInTheDocument();
  });
});

test("<OnboardingForm /> renders errors for first and last names if they exceed limit", async () => {
  render(<OnboardingForm />);

  const firstNameInput = screen.getByTestId("first-name-input");
  const lastNameInput = screen.getByTestId("last-name-input");

  const submitButton = screen.getByTestId("submit-button");

  const longText = "a".repeat(51);

  fireEvent.change(firstNameInput, { target: { value: longText } });
  fireEvent.change(lastNameInput, { target: { value: longText } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("First name must be less than 50 characters")).toBeInTheDocument();
    expect(screen.getByText("Last name must be less than 50 characters")).toBeInTheDocument();
  });
});

test("<OnboardingForm /> renders error messages for invalid phone input", async () => {
  const { rerender } = render(<OnboardingForm />);

  const phoneInput = screen.getByTestId("phone-input");
  const submitButton = screen.getByTestId("submit-button");

  fireEvent.change(phoneInput, { target: { value: "14165551234" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Invalid phone number")).toBeInTheDocument();
  });

  rerender(<OnboardingForm />);

  fireEvent.change(screen.getByTestId("phone-input"), { target: { value: "+1416555123" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.queryByText("Invalid phone number")).toBeInTheDocument();
  });
});

test("<OnboardingForm /> renders error messages for invalid corporation number", async () => {
  render(<OnboardingForm />);

  const corporationInput = screen.getByTestId("corporation-input");
  const submitButton = screen.getByTestId("submit-button");

  fireEvent.change(corporationInput, { target: { value: "12345678" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Corporation number must be 9 characters long")).toBeInTheDocument();
  });
});

test("<OnboardingForm /> displays error when corporation validation fails", async () => {
  render(<OnboardingForm />);

  const firstNameInput = screen.getByTestId("first-name-input");
  const lastNameInput = screen.getByTestId("last-name-input");
  const phoneInput = screen.getByTestId("phone-input");
  const corporationInput = screen.getByTestId("corporation-input");

  const submitButton = screen.getByTestId("submit-button");

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.change(phoneInput, { target: { value: "+14165551234" } });
  fireEvent.change(corporationInput, { target: { value: "999999999" } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Corporation number is invalid")).toBeInTheDocument();
  });
});

test("<OnboardingForm /> displays no errors when valid input is provided", async () => {
  const { container } = render(<OnboardingForm />);

  const firstNameInput = screen.getByTestId("first-name-input");
  const lastNameInput = screen.getByTestId("last-name-input");
  const phoneInput = screen.getByTestId("phone-input");
  const corporationInput = screen.getByTestId("corporation-input");

  const submitButton = screen.getByTestId("submit-button");

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.change(phoneInput, { target: { value: "+14165551234" } });
  fireEvent.change(corporationInput, { target: { value: "123456789" } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(container.querySelectorAll(".text-error").length).toBe(0);
  });
});
