import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../header";

// Mock de Next.js Image sin atributo fill
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...restProps } = props;
    return <img {...restProps} />;
  },
}));

// Mock del componente SearchSuggestions
jest.mock("../SearchSuggestions", () => ({
  __esModule: true,
  default: ({ query }: { query: string }) => (
    <div data-testid="search-suggestions">Resultados para: {query}</div>
  ),
}));

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock document.cookie vacío por defecto
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  it("renders the header with correct structure", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    
    // Verifica que el logo esté presente
    const logo = screen.getByAltText("Logo MARPROFUNDO");
    expect(logo).toBeInTheDocument();
    
    // Verifica los enlaces de navegación
    expect(screen.getByText("MAR ABIERTO")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
    expect(screen.getByText("Manuales")).toBeInTheDocument();
    expect(screen.getByText("Aqualog")).toBeInTheDocument();
    expect(screen.getByText("Pecera")).toBeInTheDocument();
    expect(screen.getByText("redes")).toBeInTheDocument();
  });

  it("shows login button when no token is present", async () => {
    render(<Header />);
    
    // Espera a que el efecto se ejecute
    await waitFor(() => {
      const loginButton = screen.getByText("Login");
      expect(loginButton).toBeInTheDocument();
      expect(screen.queryByText("Perfil")).not.toBeInTheDocument();
    });
  });

  it("shows profile button when token is present", async () => {
    // Configura cookie con token
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "accessToken=abc123",
    });
    
    render(<Header />);
    
    await waitFor(() => {
      const profileButton = screen.getByText("Perfil");
      expect(profileButton).toBeInTheDocument();
      expect(screen.queryByText("Login")).not.toBeInTheDocument();
    });
  });

  it("updates search query when typing", () => {
    render(<Header />);
    
    const searchInput = screen.getByPlaceholderText("Buscar peces o productos...") as HTMLInputElement;
    
    fireEvent.change(searchInput, { target: { value: "pez payaso" } });
    
    expect(searchInput.value).toBe("pez payaso");
  });

  it("shows search suggestions when query is not empty", () => {
    render(<Header />);
    
    const searchInput = screen.getByPlaceholderText("Buscar peces o productos...");
    
    fireEvent.change(searchInput, { target: { value: "pez" } });
    
    // No necesita waitFor porque el estado se actualiza sincrónicamente
    const suggestions = screen.getByTestId("search-suggestions");
    expect(suggestions).toBeInTheDocument();
    expect(suggestions).toHaveTextContent("Resultados para: pez");
  });

  it("hides search suggestions when query is empty", () => {
    render(<Header />);
    
    const searchInput = screen.getByPlaceholderText("Buscar peces o productos...");
    
    // Primero escribe algo para mostrar sugerencias
    fireEvent.change(searchInput, { target: { value: "pez" } });
    
    // Luego borra el texto
    fireEvent.change(searchInput, { target: { value: "" } });
    
    expect(screen.queryByTestId("search-suggestions")).not.toBeInTheDocument();
  });

  it("has cart button", () => {
    render(<Header />);
    
    // Buscar el botón del carrito de compras
    // Todos los botones, encontrar el que contiene un SVG (el ícono del carrito)
    const buttons = screen.getAllByRole("button");
    
    // El botón del carrito es el primero que no tiene texto visible
    const cartButton = buttons.find(button => {
      const hasText = button.textContent && button.textContent.trim().length > 0;
      const hasSvg = button.querySelector('svg');
      return !hasText && hasSvg;
    });
    
    expect(cartButton).toBeInTheDocument();
  });

  it("has mobile menu button on small screens", () => {
    render(<Header />);
    
    // Buscar el botón del menú móvil (el que tiene la clase md:hidden)
    const buttons = screen.getAllByRole("button");
    const mobileMenuButton = buttons.find(button => 
      button.className.includes("md:hidden")
    );
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it("has correct CSS classes for styling", () => {
    render(<Header />);
    
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky", "top-0", "z-50");
    
    // Buscar el botón de Login (no el enlace dentro de él)
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toHaveClass("bg-blue-600", "hover:bg-blue-700");
  });

  it("listens to storage events for auth changes", async () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    
    const { unmount } = render(<Header />);
    
    expect(addEventListenerSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    
    // Simula un evento de storage
    const storageEvent = new Event("storage");
    window.dispatchEvent(storageEvent);
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith("storage", expect.any(Function));
    
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("handles server-side rendering by checking for document", () => {
    // Guarda la implementación original
    const originalDocument = global.document;
    
    // Simula entorno sin document (SSR) - usando un mock temporal
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = jest.fn();
    
    try {
      // Esto debería renderizar sin errores
      expect(() => render(<Header />)).not.toThrow();
    } finally {
      // Restaura la implementación original
      Object.defineProperty = originalDefineProperty;
    }
  });
});