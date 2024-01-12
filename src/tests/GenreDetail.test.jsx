import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GenreDelete from "../pages/GenreDelete";
import GenreDetail from "../pages/GenreDetail";
import GenreForm from "../pages/GenreForm";

describe("GenreDetail component", () => {
    it("renders Genre name", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/sport"]}>
                <Routes>
                    <Route path="/genre/sport" element={<GenreDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("sport")).toBeInTheDocument();
        });
    });

    it("renders Genre not Found", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/random"]}>
                <Routes>
                    <Route path="/genre/random" element={<GenreDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Genre not Found")).toBeInTheDocument();
        });
    });

    it("render Genre without games delete page", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/sport"]}>
                <Routes>
                    <Route path="/genre/sport" element={<GenreDetail />} />
                    <Route path="/genre/sport/delete" element={<GenreDelete />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            userEvent.click(screen.getByText("Delete"));
        });

        await waitFor(() => {
            expect(screen.getByText("Delete the following games before attempting to delete this genre.")).toBeInTheDocument();
        });
    });

    it("render Genre without games delete page", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/action"]}>
                <Routes>
                    <Route path="/genre/action" element={<GenreDetail />} />
                    <Route path="/genre/action/delete" element={<GenreDelete />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            userEvent.click(screen.getByRole("button", { name: "Delete" }));
        });

        await waitFor(() => {
            expect(screen.getByText("Are you sure you want to delete this genre?")).toBeInTheDocument();
        });
    });

    it("render Genre update page", async () => {
        render(
            <MemoryRouter initialEntries={["/genre/sport"]}>
                <Routes>
                    <Route path="/genre/sport" element={<GenreDetail />} />
                    <Route path="/genre/sport/update" element={<GenreForm />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            userEvent.click(screen.getByRole("button", { name: "Update" }));
        });

        await waitFor(() => {
            expect(screen.getByPlaceholderText("genre name")).toBeInTheDocument();
        });
    });
});
