import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("react-lite-youtube-embed/dist/LiteYouTubeEmbed.css", () => ({}));
vi.mock("react-lite-youtube-embed", () => ({
  default: ({ id, title }: { id: string; title: string }) => (
    <div data-testid="lite-yt" data-video-id={id} aria-label={title}>
      yt:{id}
    </div>
  ),
}));

import { YouTubeEmbed } from "../ui/components/youtube-embed";

describe("YouTubeEmbed", () => {
  it("happy path: passa videoId e title pro componente subjacente", () => {
    render(<YouTubeEmbed videoId="abc123" title="Como comprimir PDF" />);

    const node = screen.getByTestId("lite-yt");
    expect(node).toHaveAttribute("data-video-id", "abc123");
    expect(node).toHaveAttribute("aria-label", "Como comprimir PDF");
    expect(node).toHaveTextContent("yt:abc123");
  });

  it("renderiza wrapper com aspect-video e overflow-hidden", () => {
    const { container } = render(<YouTubeEmbed videoId="x" title="y" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/aspect-video/);
    expect(wrapper.className).toMatch(/overflow-hidden/);
  });
});
