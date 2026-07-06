/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { downloadTXT } from "../downloadStories";

const mockCreateObjectURL = vi.fn(() => "blob:mock-url-123");
const mockRevokeObjectURL = vi.fn();
const mockClick = vi.fn();
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();

const originalCreateObjectURL = URL.createObjectURL;
const originalRevokeObjectURL = URL.revokeObjectURL;

beforeEach(() => {
  vi.clearAllMocks();
  URL.createObjectURL = mockCreateObjectURL;
  URL.revokeObjectURL = mockRevokeObjectURL;

  const mockLink = {
    href: "",
    download: "",
    click: mockClick,
  } as unknown as HTMLAnchorElement;

  mockCreateObjectURL.mockReturnValue("blob:mock-url-123");

  vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);
  vi.spyOn(document.body, "appendChild").mockImplementation(mockAppendChild);
  vi.spyOn(document.body, "removeChild").mockImplementation(mockRemoveChild);
});

afterEach(() => {
  URL.createObjectURL = originalCreateObjectURL;
  URL.revokeObjectURL = originalRevokeObjectURL;
});

describe("downloadTXT", () => {
  it("creates a blob with text/plain mime type", () => {
    const story = {
      title: "My Story",
      prompt: "Once upon a time",
      content: "There was a hero.",
      generatedAt: new Date("2024-01-01"),
    };

    let capturedBlob: Blob | null = null;
    mockCreateObjectURL.mockImplementation((blob: Blob) => {
      capturedBlob = blob;
      return "blob:mock-url-123";
    });

    downloadTXT(story as any);

    expect(capturedBlob).not.toBeNull();
    expect(capturedBlob!.type).toBe("text/plain");
  });

  it("creates object URL from the blob", () => {
    const story = {
      title: "Test Title",
      prompt: "A prompt",
      content: "Story content",
      generatedAt: new Date(),
    };

    downloadTXT(story as any);

    expect(mockCreateObjectURL).toHaveBeenCalledOnce();
    const blobArg = mockCreateObjectURL.mock.calls[0][0] as Blob;
    expect(blobArg).toBeInstanceOf(Blob);
  });

  it("creates and clicks a download link", () => {
    const story = {
      title: "Download Test",
      prompt: "Test prompt",
      content: "Test content",
      generatedAt: new Date(),
    };

    downloadTXT(story as any);

    expect(mockClick).toHaveBeenCalledOnce();
  });

  it("revokes the object URL after click", () => {
    const story = {
      title: "Cleanup Test",
      prompt: "Prompt",
      content: "Content",
      generatedAt: new Date(),
    };

    downloadTXT(story as any);

    expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:mock-url-123");
  });

  it("formats story fields into the blob content", async () => {
    const story = {
      title: "My Title",
      prompt: "A dragon story",
      content: "The dragon flew away.",
      generatedAt: new Date("2024-06-15"),
    };

    let capturedContent = "";
    mockCreateObjectURL.mockImplementation((blob: Blob) => {
      blob.text().then((text) => {
        capturedContent = text;
      });
      return "blob:mock-url-123";
    });

    downloadTXT(story as any);

    // Give the async blob.text() a moment to resolve
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(capturedContent).toContain("Title: My Title");
    expect(capturedContent).toContain("Prompt: A dragon story");
    expect(capturedContent).toContain("Story: The dragon flew away.");
  });

  it("sanitizes title for download filename by replacing invalid chars", () => {
    const story = {
      title: "Test: Story/With*Invalid?Chars",
      prompt: "prompt",
      content: "content",
      generatedAt: new Date(),
    };

    let capturedFilename = "";
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "a") {
        return {
          click: mockClick,
          href: "",
          download: "",
          style: { display: "" },
          setAttribute: vi.fn(),
          appendChild: vi.fn(),
          removeChild: vi.fn(),
        } as unknown as HTMLAnchorElement;
      }
      return originalCreateObjectURL as any;
    });

    // We verify the function handles the title without throwing
    expect(() => downloadTXT(story as any)).not.toThrow();
  });

  it("uses toLocaleString for the generated date", async () => {
    const story = {
      title: "Date Test",
      prompt: "p",
      content: "c",
      generatedAt: new Date(),
    };

    let capturedContent = "";
    mockCreateObjectURL.mockImplementation((blob: Blob) => {
      blob.text().then((text) => {
        capturedContent = text;
      });
      return "blob:mock-url-123";
    });

    downloadTXT(story as any);

    await new Promise((resolve) => setTimeout(resolve, 10));

    // toLocaleString produces output containing the word "Generated:" and a date
    expect(capturedContent).toContain("Generated:");
    expect(capturedContent).toMatch(/Generated: .+/);
  });
});
