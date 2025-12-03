/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../home";
import { useRouter } from "next/navigation";

// Mock de los componentes hijos
jest.mock("../components/molecules/FishesPromo", () => ({
  __esModule: true,
  default: () => <div data-testid="fishes-promo">FishesPromo Component</div>,
}));

jest.mock("../components/molecules/Pcategories", () => ({
  __esModule: true,
  default: () => <div data-testid="pcategories">Pcategories Component</div>,
}));

jest.mock("./LandingWelcome", () => ({
  __esModule: true,
  default: () => <div data-testid="landing-welcome">LandingWelcome Component</div>,
}));

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Component", () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    
    // Mock document.cookie y document
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows loading state initially", () => {
    render(<Home />);
    
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows LandingWelcome when user is not authenticated", async () => {
    // Configurar cookie sin token
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getByTestId("landing-welcome")).toBeInTheDocument();
      expect(screen.queryByText("¡Bienvenido de vuelta! 🎣")).not.toBeInTheDocument();
      expect(screen.queryByTestId("fishes-promo")).not.toBeInTheDocument();
      expect(screen.queryByTestId("pcategories")).not.toBeInTheDocument();
    });
  });

  it("shows full store when user is authenticated", async () => {
    // Configurar cookie con token
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "accessToken=abc123",
    });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
      
      expect(screen.queryByTestId("landing-welcome")).not.toBeInTheDocument();

      expect(screen.getByText("¡Bienvenido de vuelta! 🎣")).toBeInTheDocument();
      expect(screen.getByText("Explora nuestros productos y ofertas especiales")).toBeInTheDocument();
      
      expect(screen.getByTestId("pcategories")).toBeInTheDocument();
      expect(screen.getByTestId("fishes-promo")).toBeInTheDocument();
      
      expect(screen.getByText("Productos Destacados")).toBeInTheDocument();
      expect(screen.getByText("Caña Profesional")).toBeInTheDocument();
      expect(screen.getByText("Kit Señuelos")).toBeInTheDocument();
      expect(screen.getByText("Acuario 50L")).toBeInTheDocument();
      expect(screen.getByText("Alimento Premium")).toBeInTheDocument();
    });
  });

  it("handles storage events for authentication changes", async () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    
    const { unmount } = render(<Home />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    
    const storageEvent = new Event("storage");
    window.dispatchEvent(storageEvent);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith("storage", expect.any(Function));
  });

  it("handles server-side rendering by checking for document", () => {
    const originalDocument = global.document;
    
    delete (global as any).document;
    
    expect(() => render(<Home />)).not.toThrow();
    
    (global as any).document = originalDocument;
  });

  it("renders product cards with correct structure", async () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "accessToken=abc123",
    });
    
    render(<Home />);
    
    await waitFor(() => {
      const productCards = screen.getAllByRole("button", { name: /agregar al carrito/i });
      expect(productCards).toHaveLength(4);
      
      expect(screen.getByText("$120.000")).toBeInTheDocument();
      expect(screen.getByText("$85.000")).toBeInTheDocument();
      expect(screen.getByText("$250.000")).toBeInTheDocument();
      expect(screen.getByText("$45.000")).toBeInTheDocument();
      
      const emojis = ["🎣", "🐟", "🐠", "🦐"];
      emojis.forEach(emoji => {
        const emojiElements = screen.getAllByText(emoji);
        expect(emojiElements.length).toBeGreaterThan(0);
      });
    });
  });

  it("responds to add to cart button clicks", async () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "accessToken=abc123",
    });
    
    render(<Home />);
    
    await waitFor(() => {
      const addToCartButtons = screen.getAllByRole("button", { name: /agregar al carrito/i });
      
      fireEvent.click(addToCartButtons[0]);
      
    });
  });

  describe("Layout and Styling", () => {
    it("has correct container classes", async () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "accessToken=abc123",
      });
      
      render(<Home />);
      
      await waitFor(() => {
        const mainContainer = screen.getByRole("main") || document.querySelector(".min-h-screen");
        expect(mainContainer).toBeInTheDocument();
        
        const bannerSection = screen.getByText("¡Bienvenido de vuelta! 🎣").closest("section");
        expect(bannerSection).toHaveClass("bg-blue-600", "text-white", "py-8");
        
        const featuredSection = screen.getByText("Productos Destacados").closest("section");
        expect(featuredSection).toHaveClass("bg-gray-100", "py-16");
      });
    });

    it("has responsive grid for products", async () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "accessToken=abc123",
      });
      
      render(<Home />);
      
      await waitFor(() => {
        const productsGrid = screen.getByText("Caña Profesional").closest(".grid");
        expect(productsGrid).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4");
      });
    });
  });

  describe("Error Handling", () => {
    it("handles undefined document gracefully", async () => {
      const originalDocument = global.document;
      delete (global as any).document;
      
      expect(() => render(<Home />)).not.toThrow();
      
      (global as any).document = originalDocument;
    });

    it("handles malformed cookie strings", async () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      });
      
      render(<Home />);
      
      await waitFor(() => {
        expect(screen.getByTestId("landing-welcome")).toBeInTheDocument();
      });
    });
  });
});