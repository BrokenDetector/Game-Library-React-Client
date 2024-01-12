import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GameDetail from "../pages/GameDetail";
import Games from "../pages/games";

describe("Games page", () => {
    it("shows list of games", async () => {
        render(
            <BrowserRouter>
                <Games />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByRole("game")).toHaveLength(5);
        });
    });

    it("routes to game page on click", async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Games />} />
                    <Route path={"/game/minecraft"} element={<GameDetail />} />
                </Routes>
            </BrowserRouter>
        );

        await waitFor(async () => {
            userEvent.click(screen.getByText("Minecraft"));
            await waitFor(() => {
                expect(screen.getByText("minecraft")).toBeInTheDocument();
            });
        });
    });
});
