import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DeveloperForm from "../pages/DeveloperForm";

describe("DeveloperForm component", () => {
    it("renders DeveloperForm for creating", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/create"]}>
                <Routes>
                    <Route path={`/developer/create`} element={<DeveloperForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Developer name")).toBeInTheDocument();
        });
    });

    it("renders DeveloperForm for updating", async () => {
        const developerName = "Mojang";
        render(
            <MemoryRouter initialEntries={["/developer/mojang/update"]}>
                <Routes>
                    <Route path={`/developer/mojang/update`} element={<DeveloperForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Developer name")).toHaveValue(developerName);
        });
    });

    it("submits form with valid input", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/create"]}>
                <Routes>
                    <Route path={`/developer/create`} element={<DeveloperForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(async () => {
            const inputField = screen.getByPlaceholderText("Developer name");
            await waitFor(() => {
                expect(screen.getByPlaceholderText("Developer name")).toBeInTheDocument();
            });
            await userEvent.type(inputField, "New Developer");
            expect(inputField.value).toBe("New Developer");
            userEvent.click(screen.getByRole("button", { name: "Submit" }));
        });
    });

    it("displays an error message for invalid input", async () => {
        render(
            <MemoryRouter initialEntries={["/developer/create"]}>
                <Routes>
                    <Route path={`/developer/create`} element={<DeveloperForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(async () => {
            const inputField = screen.getByPlaceholderText("Developer name");
            await waitFor(() => {
                expect(screen.getByPlaceholderText("Developer name")).toBeInTheDocument();
            });
            await userEvent.type(inputField, "t");
            await userEvent.click(screen.getByText("Submit"));
            await waitFor(() => {
                expect(screen.getByRole("errors")).toBeInTheDocument();
            });
        });
    });
});
