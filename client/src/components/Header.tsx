import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isAuthenticated?: boolean;
}

const Header = ({ isAuthenticated }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale, setLocale] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('locale');
      if (saved) setLocale(saved);
      document.documentElement.lang = saved || 'en';
    } catch (e) {
      // ignore
    }
  }, []);

  const changeLocale = (lang: string) => {
    setLocale(lang);
    try { localStorage.setItem('locale', lang); } catch (e) {}
    document.documentElement.lang = lang;
    setIsLangOpen(false);

    // Try to trigger Google Translate widget to change language.
    try {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
        return;
      }

      // Fallback: set googtrans cookie and reload to apply translation
      document.cookie = `googtrans=/en/${lang};path=/`;
      // Some setups need a reload to pick up the cookie; attempt a soft trigger first
      const frame = document.querySelector('iframe.goog-te-banner-frame');
      if (frame && (frame as HTMLIFrameElement).contentWindow) {
        (frame as HTMLIFrameElement).contentWindow!.location.reload();
      } else {
        window.location.reload();
      }
    } catch (e) {
      // ignore failures
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-border">
      <nav className="w-full py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/other-img/logoicon1.png" alt="Company logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-primary">ZielCapitalFX</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-heading hover:text-primary transition text-sm font-bold">Home</Link>
            <Link to="/markets" className="text-heading hover:text-primary transition text-sm font-bold">Markets</Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition">
                Company
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary transition">
                Resources
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/customers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Customers</Link>
                <Link to="/roadmap" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Roadmap</Link>
                <Link to="/legal-docs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Legal Docs</Link>
              </div>
            </div>
          </div>

          {/* Language selector */}
          <div className="hidden lg:flex items-center mr-4">
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="text-gray-700 hover:text-primary transition px-3 py-2 rounded-md border border-transparent hover:border-gray-200">
                {locale === 'en' ? 'English' : locale === 'es' ? 'Spanish' : 'French'}
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                  <button onClick={() => changeLocale('en')} className="w-full text-left px-4 py-2 hover:bg-gray-100">English</button>
                  <button onClick={() => changeLocale('es')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Spanish</button>
                  <button onClick={() => changeLocale('fr')} className="w-full text-left px-4 py-2 hover:bg-gray-100">French</button>
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-info">Dashboard</Link>
            ) : (
              <>
                <Link to="/signin" className="btn btn-link">
                  <i className="fas fa-circle-user mr-2"></i>Login
                </Link>
                <Link to="/signup" className="btn btn-info">Create account</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 px-0">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary">Home</Link>
            <Link to="/markets" className="block py-2 text-gray-700 hover:text-primary">Markets</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-primary">About</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-primary">Contact</Link>
            <Link to="/customers" className="block py-2 text-gray-700 hover:text-primary">Customers</Link>
            <Link to="/roadmap" className="block py-2 text-gray-700 hover:text-primary">Roadmap</Link>
            <Link to="/legal-docs" className="block py-2 text-gray-700 hover:text-primary">Legal Docs</Link>
            {/* Mobile language options */}
            <div className="mt-3 px-4">
              <div className="text-sm font-semibold text-gray-600">Language</div>
              <div className="mt-2 space-y-1">
                <button onClick={() => changeLocale('en')} className="w-full text-left py-2">English</button>
                <button onClick={() => changeLocale('es')} className="w-full text-left py-2">Spanish</button>
                <button onClick={() => changeLocale('fr')} className="w-full text-left py-2">French</button>
              </div>
            </div>
            {isAuthenticated ? (
              <Link to="/dashboard" className="block mt-4 btn btn-info w-full">Dashboard</Link>
            ) : (
              <>
                <Link to="/signin" className="block mt-4 btn btn-link w-full">Login</Link>
                <Link to="/signup" className="block mt-2 btn btn-info w-full">Create account</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
