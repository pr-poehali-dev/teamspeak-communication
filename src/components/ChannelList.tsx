import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Channel, Server } from './ServerSidebar';

interface ChannelListProps {
  selectedServer: Server;
  setActiveNav: (nav: 'servers' | 'friends' | 'chats' | 'profile' | 'shop' | 'settings') => void;
  getQualityColor: (quality?: 'excellent' | 'good' | 'fair') => string;
  getQualityIcon: (quality?: 'excellent' | 'good' | 'fair') => string;
}

const ChannelList = ({ selectedServer, setActiveNav, getQualityColor, getQualityIcon }: ChannelListProps) => {
  return (
    <div className="w-64 bg-sidebar/50 flex flex-col border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>{selectedServer.icon}</span>
          {selectedServer.name}
        </h2>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow" />
          <span className="text-green-500 font-medium">{selectedServer.online}</span>
          <span className="text-muted-foreground">/ {selectedServer.total} онлайн</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {selectedServer.channels.map((channel) => (
          <button
            key={channel.id}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-all group"
          >
            <Icon
              name={channel.type === 'voice' ? 'Volume2' : 'Hash'}
              size={20}
              className="text-muted-foreground group-hover:text-foreground"
            />
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">{channel.name}</div>
              {channel.users && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Users" size={12} />
                  {channel.users} в сети
                </div>
              )}
            </div>
            {channel.quality && (
              <Icon
                name={getQualityIcon(channel.quality)}
                size={16}
                className={getQualityColor(channel.quality)}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-sidebar-border bg-sidebar/80">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              ПР
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold text-sm">ProGamer_2024</div>
            <div className="text-xs text-green-500 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Онлайн
            </div>
          </div>
          <button
            onClick={() => setActiveNav('settings')}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-all"
          >
            <Icon name="Settings" size={18} className="text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
