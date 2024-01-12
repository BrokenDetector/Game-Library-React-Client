import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GameDelete from "../pages/GameDelete";
import GameDetail from "../pages/GameDetail";
import GameForm from "../pages/GameForm";

describe("Game Detail page", () => {
    it("renders game name", async () => {
        render(
            <MemoryRouter initialEntries={["/game/minecraft"]}>
                <Routes>
                    <Route path="/game/minecraft" element={<GameDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("minecraft")).toBeInTheDocument();
        });
    });

    it("renders game not found", async () => {
        render(
            <MemoryRouter initialEntries={["/game/random"]}>
                <Routes>
                    <Route path="/game/random" element={<GameDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Game not Found")).toBeInTheDocument();
        });
    });

    it("render game delete page", async () => {
        render(
            <MemoryRouter initialEntries={["/game/minecraft"]}>
                <Routes>
                    <Route path="/game/minecraft" element={<GameDetail />} />
                    <Route path="/game/minecraft/delete" element={<GameDelete />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            userEvent.click(screen.getByText("Delete"));
        });
        await waitFor(() => {
            expect(screen.getByText("Are you sure you want to delete this game?")).toBeInTheDocument();
        });
    });

    it("render game update page", async () => {
        render(
            <MemoryRouter initialEntries={["/game/minecraft"]}>
                <Routes>
                    <Route path="/game/minecraft" element={<GameDetail />} />
                    <Route path="/game/minecraft/update" element={<GameForm />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            userEvent.click(screen.getByText("Update"));
        });
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Title")).toHaveValue("minecraft");
        });
    });
});
