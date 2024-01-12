import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GameForm from "../pages/GameForm";

describe("GameForm component", () => {
      it("renders GameForm for creating", async () => {
        render(
            <MemoryRouter initialEntries={["/game/create"]}>
                <Routes>
                    <Route path={`/game/create`} element={<GameForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
        });
    });

    it("renders GameForm for updating", async () => {
        const gameName = "minecraft";
        render(
            <MemoryRouter initialEntries={["/game/minecraft/update"]}>
                <Routes>
                    <Route path={`/game/minecraft/update`} element={<GameForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Title")).toHaveValue(gameName);
        });
    });

    it("submits form with valid input", async () => {
        render(
            <MemoryRouter initialEntries={["/game/create"]}>
                <Routes>
                    <Route path={`/game/create`} element={<GameForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(async () => {
            const inputField = screen.getByPlaceholderText("Title");
            await waitFor(() => {
                expect(inputField).toBeInTheDocument();
            });
            await userEvent.type(inputField, "New game");
            await userEvent.selectOptions(screen.getByRole("dev-select"), "5");
            await userEvent.selectOptions(screen.getByRole("genre-select"), "1");

            expect(inputField.value).toBe("New game");

            userEvent.click(screen.getByRole("button", { name: "Submit" }));
        });
    });
 
    it("displays an error message for invalid input", async () => {
        render(
            <MemoryRouter initialEntries={["/game/create"]}>
                <Routes>
                    <Route path={`/game/create`} element={<GameForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(async () => {
            const inputField = screen.getByPlaceholderText("Title");
            await waitFor(() => {
                expect(inputField).toBeInTheDocument();
            });
            await userEvent.type(inputField, "t");

            await userEvent.selectOptions(screen.getByRole("dev-select"), "5");
            await userEvent.selectOptions(screen.getByRole("genre-select"), "1");

            userEvent.click(screen.getByText("Submit"));

            await waitFor(() => {
                expect(screen.getByRole("errors")).toBeInTheDocument();
            });
        });
    });
});
