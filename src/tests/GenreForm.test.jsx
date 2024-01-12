import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GenreForm from "../pages/GenreForm";

describe("GenreForm component", () => {
    it("renders GenreForm for creating", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/create"]}>
                <Routes>
                    <Route path={`/genre/create`} element={<GenreForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByPlaceholderText("genre name")).toBeInTheDocument();
        });
    });

    it("renders GenreForm for updating", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/sport/update"]}>
                <Routes>
                    <Route path={`/genre/sport/update`} element={<GenreForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByPlaceholderText("genre name")).toHaveValue("sport");
        });
    });

    it("submits form with valid input", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/create"]}>
                <Routes>
                    <Route path={`/genre/create`} element={<GenreForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(async () => {
            const inputField = screen.getByPlaceholderText("genre name");
            await waitFor(() => {
                expect(screen.getByPlaceholderText("genre name")).toBeInTheDocument();
            });
            await userEvent.type(inputField, "New Genre");
            expect(inputField.value).toBe("New Genre");
            userEvent.click(screen.getByRole("button", { name: "Submit" }));
        });
    });

    it("displays an error message for invalid input", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/create"]}>
                <Routes>
                    <Route path={`/genre/create`} element={<GenreForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(async () => {
            const inputField = screen.getByPlaceholderText("genre name");
            await waitFor(() => {
                expect(screen.getByPlaceholderText("genre name")).toBeInTheDocument();
            });
            await userEvent.type(inputField, "t");
            await userEvent.click(screen.getByText("Submit"));
            await waitFor(() => {
                expect(screen.getByRole("errors")).toBeInTheDocument();
            });
        });
    });
});
