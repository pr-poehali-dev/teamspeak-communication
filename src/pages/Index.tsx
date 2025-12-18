import { useState } from 'react';
import ServerSidebar, { Server } from '@/components/ServerSidebar';
import ChannelList from '@/components/ChannelList';
import MainContent from '@/components/MainContent';
import BottomNavigation from '@/components/BottomNavigation';

type NavItem = 'servers' | 'friends' | 'chats' | 'profile' | 'shop' | 'settings';

const mockServers: Server[] = [
  {
    id: 1,
    name: 'CS:GO Pro League',
    icon: '🎮',
    online: 847,
    total: 1240,
    channels: [
      { id: 1, name: 'Лобби', type: 'voice', users: 12, quality: 'excellent' },
      { id: 2, name: 'Тренировка', type: 'voice', users: 5, quality: 'excellent' },
      { id: 3, name: 'Турнир', type: 'voice', users: 24, quality: 'good' },
      { id: 4, name: 'Общий чат', type: 'text' },
    ],
  },
  {
    id: 2,
    name: 'Dota 2 Squad',
    icon: '⚔️',
    online: 423,
    total: 890,
    channels: [
      { id: 5, name: 'Ranked Party', type: 'voice', users: 8, quality: 'excellent' },
      { id: 6, name: 'Casual Games', type: 'voice', users: 15, quality: 'good' },
      { id: 7, name: 'Стратегии', type: 'text' },
    ],
  },
  {
    id: 3,
    name: 'Valorant Masters',
    icon: '💥',
    online: 612,
    total: 1050,
    channels: [
      { id: 8, name: 'Competitive', type: 'voice', users: 20, quality: 'excellent' },
      { id: 9, name: 'Practice Range', type: 'voice', users: 3, quality: 'good' },
      { id: 10, name: 'Новости', type: 'text' },
    ],
  },
];

const Index = () => {
  const [activeNav, setActiveNav] = useState<NavItem>('servers');
  const [servers, setServers] = useState<Server[]>(mockServers);
  const [selectedServer, setSelectedServer] = useState<Server>(mockServers[0]);
  const [micVolume, setMicVolume] = useState([75]);
  const [soundVolume, setSoundVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [newServerName, setNewServerName] = useState('');
  const [newServerIcon, setNewServerIcon] = useState('🎮');
  const [newChannels, setNewChannels] = useState<Array<{name: string, type: 'voice' | 'text'}>>([{name: 'Общий', type: 'voice'}]);

  const iconOptions = ['🎮', '⚔️', '💥', '🎯', '🏆', '⚡', '🔥', '💎', '🚀', '🎪'];

  const addChannel = () => {
    setNewChannels([...newChannels, {name: '', type: 'voice'}]);
  };

  const updateChannel = (index: number, field: 'name' | 'type', value: string) => {
    const updated = [...newChannels];
    if (field === 'type' && (value === 'voice' || value === 'text')) {
      updated[index][field] = value;
    } else if (field === 'name') {
      updated[index][field] = value;
    }
    setNewChannels(updated);
  };

  const removeChannel = (index: number) => {
    setNewChannels(newChannels.filter((_, i) => i !== index));
  };

  const createServer = () => {
    if (!newServerName.trim()) return;
    
    const newId = Math.max(...servers.map(s => s.id)) + 1;
    const channelStartId = Math.max(...servers.flatMap(s => s.channels.map(c => c.id))) + 1;
    
    const newServer: Server = {
      id: newId,
      name: newServerName,
      icon: newServerIcon,
      online: Math.floor(Math.random() * 500) + 100,
      total: Math.floor(Math.random() * 1000) + 500,
      channels: newChannels.map((ch, idx) => ({
        id: channelStartId + idx,
        name: ch.name || `Канал ${idx + 1}`,
        type: ch.type,
        users: ch.type === 'voice' ? Math.floor(Math.random() * 20) : undefined,
        quality: ch.type === 'voice' ? 'excellent' as const : undefined,
      })),
    };
    
    setServers([...servers, newServer]);
    setSelectedServer(newServer);
    setIsCreateDialogOpen(false);
    setNewServerName('');
    setNewServerIcon('🎮');
    setNewChannels([{name: 'Общий', type: 'voice'}]);
  };

  const getQualityColor = (quality?: 'excellent' | 'good' | 'fair') => {
    switch (quality) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-yellow-500';
      case 'fair':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getQualityIcon = (quality?: 'excellent' | 'good' | 'fair') => {
    switch (quality) {
      case 'excellent':
        return 'Signal';
      case 'good':
        return 'SignalMedium';
      case 'fair':
        return 'SignalLow';
      default:
        return 'SignalZero';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <ServerSidebar
        servers={servers}
        selectedServer={selectedServer}
        setSelectedServer={setSelectedServer}
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        newServerName={newServerName}
        setNewServerName={setNewServerName}
        newServerIcon={newServerIcon}
        setNewServerIcon={setNewServerIcon}
        newChannels={newChannels}
        setNewChannels={setNewChannels}
        iconOptions={iconOptions}
        addChannel={addChannel}
        updateChannel={updateChannel}
        removeChannel={removeChannel}
        createServer={createServer}
      />

      <ChannelList
        selectedServer={selectedServer}
        setActiveNav={setActiveNav}
        getQualityColor={getQualityColor}
        getQualityIcon={getQualityIcon}
      />

      <MainContent
        activeNav={activeNav}
        micVolume={micVolume}
        setMicVolume={setMicVolume}
        soundVolume={soundVolume}
        setSoundVolume={setSoundVolume}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDeafened={isDeafened}
        setIsDeafened={setIsDeafened}
      />

      <BottomNavigation
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
    </div>
  );
};

export default Index;
