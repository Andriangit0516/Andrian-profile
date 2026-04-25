import ThemeToggle from './ThemeToggle';

interface NavProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export default function Nav({ toggleTheme, isDark }: NavProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav>
      <a href="#" className="logo">AD.</a>
      <ul className="nav-links">
        {['#home', '#about', '#skills', '#projects', '#contact'].map(href => (
          <li key={href}>
            <a href={href} onClick={e => handleNavClick(e, href)}>
              {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
            </a>
          </li>
        ))}
        <li>
          <ThemeToggle isDark={isDark} onClick={toggleTheme} />
        </li>
      </ul>
    </nav>
  );
}
