import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type NavItem = 'servers' | 'friends' | 'chats' | 'profile' | 'shop' | 'settings';

interface BottomNavigationProps {
  activeNav: NavItem;
  setActiveNav: (nav: NavItem) => void;
}

const BottomNavigation = ({ activeNav, setActiveNav }: BottomNavigationProps) => {
  const navItems = [
    { id: 'servers' as NavItem, icon: 'Gamepad2', label: 'Серверы' },
    { id: 'friends' as NavItem, icon: 'Users', label: 'Друзья' },
    { id: 'chats' as NavItem, icon: 'MessageSquare', label: 'Чаты' },
    { id: 'profile' as NavItem, icon: 'User', label: 'Профиль' },
    { id: 'shop' as NavItem, icon: 'ShoppingBag', label: 'Магазин' },
    { id: 'settings' as NavItem, icon: 'Settings', label: 'Параметры' },
  ];

  return (
    <nav className="h-20 border-t border-sidebar-border bg-card/30 backdrop-blur-sm px-6 flex items-center justify-center gap-3">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={activeNav === item.id ? 'default' : 'ghost'}
          onClick={() => setActiveNav(item.id)}
          className={`flex-1 h-14 flex flex-col gap-1 ${
            activeNav === item.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={item.icon} size={20} />
          <span className="text-xs font-medium">{item.label}</span>
        </Button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
