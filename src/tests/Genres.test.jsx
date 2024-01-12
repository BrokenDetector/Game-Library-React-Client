import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GenreDetail from "../pages/GenreDetail";
import Genres from "../pages/Genres";

describe("Genres page", () => {
    it("renders Genres name", async () => {
        render(
            <BrowserRouter>
                <Genres />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("All Genres:")).toBeInTheDocument();
        });
    });

    it("shows list of genres", async () => {
        render(
            <BrowserRouter>
                <Genres />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByRole("genre")).toHaveLength(3);
        });
    });

    it("routes to genre page on click", async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Genres />} />
                    <Route path={"/genre/sport"} element={<GenreDetail />} />
                </Routes>
            </BrowserRouter>
        );

        await waitFor(() => {
            userEvent.click(screen.getByText("sport"));
            expect(screen.getByText("Games In Genre:")).toBeInTheDocument();
        });
    });
});
