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
      // Verificar que ya no está en estado de carga
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
      
      // Verificar que no muestra LandingWelcome
      expect(screen.queryByTestId("landing-welcome")).not.toBeInTheDocument();
      
      // Verificar contenido de la tienda
      expect(screen.getByText("¡Bienvenido de vuelta! 🎣")).toBeInTheDocument();
      expect(screen.getByText("Explora nuestros productos y ofertas especiales")).toBeInTheDocument();
      
      // Verificar componentes hijos
      expect(screen.getByTestId("pcategories")).toBeInTheDocument();
      expect(screen.getByTestId("fishes-promo")).toBeInTheDocument();
      
      // Verificar productos destacados
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
    
    // Verificar que se añade el event listener
    expect(addEventListenerSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    
    // Simular un cambio en el storage (logout en otra pestaña)
    const storageEvent = new Event("storage");
    window.dispatchEvent(storageEvent);
    
    // Desmontar componente
    unmount();
    
    // Verificar que se remueve el event listener
    expect(removeEventListenerSpy).toHaveBeenCalledWith("storage", expect.any(Function));
  });

  it("handles server-side rendering by checking for document", () => {
    // Guardar document original
    const originalDocument = global.document;
    
    // Simular entorno sin document (SSR)
    delete (global as any).document;
    
    // Debe renderizar sin errores
    expect(() => render(<Home />)).not.toThrow();
    
    // Restaurar document
    (global as any).document = originalDocument;
  });

  it("renders product cards with correct structure", async () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "accessToken=abc123",
    });
    
    render(<Home />);
    
    await waitFor(() => {
      // Verificar estructura de las tarjetas de producto
      const productCards = screen.getAllByRole("button", { name: /agregar al carrito/i });
      expect(productCards).toHaveLength(4);
      
      // Verificar precios
      expect(screen.getByText("$120.000")).toBeInTheDocument();
      expect(screen.getByText("$85.000")).toBeInTheDocument();
      expect(screen.getByText("$250.000")).toBeInTheDocument();
      expect(screen.getByText("$45.000")).toBeInTheDocument();
      
      // Verificar emojis en los productos (están como spans con texto)
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
      
      // Simular click en el primer botón
      fireEvent.click(addToCartButtons[0]);
      
      // Aquí podrías verificar que se ejecuta alguna función
      // Por ejemplo, si tuvieras un handler onClick en el botón
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
        
        // Verificar clases de Tailwind
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
      // Mockear que estamos en servidor (document undefined)
      const originalDocument = global.document;
      delete (global as any).document;
      
      // No debería lanzar error
      expect(() => render(<Home />)).not.toThrow();
      
      // Restaurar document
      (global as any).document = originalDocument;
    });

    it("handles malformed cookie strings", async () => {
      // Cookie mal formada
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
      });
      
      render(<Home />);
      
      await waitFor(() => {
        // Debería mostrar LandingWelcome porque el token está vacío
        expect(screen.getByTestId("landing-welcome")).toBeInTheDocument();
      });
    });
  });
});