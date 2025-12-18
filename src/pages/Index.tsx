import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type NavItem = 'servers' | 'friends' | 'chats' | 'profile' | 'shop' | 'settings';

interface Server {
  id: number;
  name: string;
  icon: string;
  online: number;
  total: number;
  channels: Channel[];
}

interface Channel {
  id: number;
  name: string;
  type: 'voice' | 'text';
  users?: number;
  quality?: 'excellent' | 'good' | 'fair';
}

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
      <aside className="w-20 bg-sidebar flex flex-col items-center py-4 space-y-4 border-r border-sidebar-border">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 cursor-pointer hover:rounded-xl transition-all">
          TS
        </div>
        
        <div className="w-full flex flex-col items-center space-y-3">
          {servers.map((server) => (
            <button
              key={server.id}
              onClick={() => setSelectedServer(server)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all hover:rounded-xl relative group ${
                selectedServer.id === server.id
                  ? 'rounded-xl bg-primary'
                  : 'bg-sidebar-accent hover:bg-sidebar-accent/80'
              }`}
            >
              {server.icon}
              {selectedServer.id === server.id && (
                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full -ml-2" />
              )}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <button className="w-12 h-12 bg-sidebar-accent rounded-2xl flex items-center justify-center hover:bg-primary hover:rounded-xl transition-all group">
              <Icon name="Plus" size={24} className="text-muted-foreground group-hover:text-primary-foreground" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-primary" />
                Создать сервер
              </DialogTitle>
              <DialogDescription>
                Настрой свой игровой сервер с голосовыми и текстовыми каналами
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="server-name" className="flex items-center gap-2">
                  <Icon name="Hash" size={16} />
                  Название сервера
                </Label>
                <Input
                  id="server-name"
                  placeholder="Мой игровой сервер"
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Icon name="Smile" size={16} />
                  Иконка сервера
                </Label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewServerIcon(icon)}
                      className={`w-full aspect-square text-3xl rounded-lg border-2 transition-all hover:scale-110 ${
                        newServerIcon === icon
                          ? 'border-primary bg-primary/20'
                          : 'border-sidebar-border bg-sidebar-accent/50 hover:border-primary/50'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Icon name="Radio" size={16} />
                    Каналы сервера
                  </Label>
                  <Button
                    onClick={addChannel}
                    size="sm"
                    variant="outline"
                    className="h-8"
                  >
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить
                  </Button>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {newChannels.map((channel, index) => (
                    <Card key={index} className="p-3 border-sidebar-border">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Название канала"
                            value={channel.name}
                            onChange={(e) => updateChannel(index, 'name', e.target.value)}
                            className="h-9"
                          />
                          <Select
                            value={channel.type}
                            onValueChange={(value) => updateChannel(index, 'type', value)}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="voice">
                                <div className="flex items-center gap-2">
                                  <Icon name="Volume2" size={14} />
                                  Голосовой
                                </div>
                              </SelectItem>
                              <SelectItem value="text">
                                <div className="flex items-center gap-2">
                                  <Icon name="Hash" size={14} />
                                  Текстовый
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {newChannels.length > 1 && (
                          <Button
                            onClick={() => removeChannel(index)}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-sidebar-border">
                <Button
                  onClick={() => setIsCreateDialogOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  onClick={createServer}
                  disabled={!newServerName.trim()}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Icon name="Check" size={18} className="mr-2" />
                  Создать сервер
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </aside>

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

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-sidebar-border flex items-center px-6 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Volume2" size={20} />
            <span className="font-medium"># Лобби</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              <Icon name="Signal" size={14} className="mr-1" />
              Отличное качество
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Icon name="Gauge" size={14} className="mr-1" />
              12ms пинг
            </Badge>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeNav === 'servers' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Users" size={28} />
                  Активные участники
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Card key={i} className="p-4 hover:bg-card/80 transition-all cursor-pointer border-sidebar-border hover:border-primary/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/20 text-primary font-bold">
                            U{i + 1}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">User_{i + 1}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full voice-active" />
                            Говорит
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={24} className="text-primary" />
                  Особенности TeamSpeak Pro
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20 hover:border-primary/50 transition-all">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon name="Mic" size={24} className="text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">Фильтрация шума</h4>
                    <p className="text-sm text-muted-foreground">
                      ИИ-алгоритмы удаляют фоновые звуки для кристально чистого голоса
                    </p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/50 transition-all">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon name="Activity" size={24} className="text-green-500" />
                    </div>
                    <h4 className="font-bold mb-2">Низкая задержка</h4>
                    <p className="text-sm text-muted-foreground">
                      Задержка менее 15ms для мгновенной коммуникации в игре
                    </p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 hover:border-orange-500/50 transition-all">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon name="Shield" size={24} className="text-orange-500" />
                    </div>
                    <h4 className="font-bold mb-2">Шифрование</h4>
                    <p className="text-sm text-muted-foreground">
                      Защищенное соединение для конфиденциальных разговоров команды
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Settings" size={28} />
                  Параметры звука
                </h3>

                <Card className="p-6 space-y-6 border-sidebar-border">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Mic" size={18} className="text-primary" />
                        Громкость микрофона
                      </label>
                      <span className="text-sm font-bold text-primary">{micVolume[0]}%</span>
                    </div>
                    <Slider
                      value={micVolume}
                      onValueChange={setMicVolume}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Icon name="Volume2" size={18} className="text-green-500" />
                        Громкость звука
                      </label>
                      <span className="text-sm font-bold text-green-500">{soundVolume[0]}%</span>
                    </div>
                    <Slider
                      value={soundVolume}
                      onValueChange={setSoundVolume}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-sidebar-border">
                    <Button
                      variant={isMuted ? 'destructive' : 'outline'}
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex-1"
                    >
                      <Icon name={isMuted ? 'MicOff' : 'Mic'} size={18} className="mr-2" />
                      {isMuted ? 'Микрофон выключен' : 'Микрофон включен'}
                    </Button>
                    <Button
                      variant={isDeafened ? 'destructive' : 'outline'}
                      onClick={() => setIsDeafened(!isDeafened)}
                      className="flex-1"
                    >
                      <Icon name={isDeafened ? 'VolumeX' : 'Volume2'} size={18} className="mr-2" />
                      {isDeafened ? 'Звук выключен' : 'Звук включен'}
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-sidebar-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">Фильтрация шума ИИ</div>
                        <div className="text-xs text-muted-foreground">
                          Удаляет клики мыши, клавиатуру и фоновые звуки
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        PRO
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Zap" size={24} className="text-primary" />
                  Статистика соединения
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 border-sidebar-border">
                    <div className="text-sm text-muted-foreground mb-1">Задержка</div>
                    <div className="text-2xl font-bold text-green-500 flex items-center gap-2">
                      12ms
                      <Icon name="TrendingDown" size={20} />
                    </div>
                  </Card>
                  <Card className="p-4 border-sidebar-border">
                    <div className="text-sm text-muted-foreground mb-1">Потеря пакетов</div>
                    <div className="text-2xl font-bold text-green-500">0.1%</div>
                  </Card>
                  <Card className="p-4 border-sidebar-border">
                    <div className="text-sm text-muted-foreground mb-1">Битрейт</div>
                    <div className="text-2xl font-bold text-primary">128 kbps</div>
                  </Card>
                  <Card className="p-4 border-sidebar-border">
                    <div className="text-sm text-muted-foreground mb-1">Качество</div>
                    <div className="text-2xl font-bold text-green-500 flex items-center gap-2">
                      <Icon name="Signal" size={24} />
                      99%
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="h-20 border-t border-sidebar-border bg-card/30 backdrop-blur-sm px-6 flex items-center justify-center gap-3">
          {[
            { id: 'servers' as NavItem, icon: 'Gamepad2', label: 'Серверы' },
            { id: 'friends' as NavItem, icon: 'Users', label: 'Друзья' },
            { id: 'chats' as NavItem, icon: 'MessageSquare', label: 'Чаты' },
            { id: 'profile' as NavItem, icon: 'User', label: 'Профиль' },
            { id: 'shop' as NavItem, icon: 'ShoppingBag', label: 'Магазин' },
            { id: 'settings' as NavItem, icon: 'Settings', label: 'Параметры' },
          ].map((item) => (
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
      </div>
    </div>
  );
};

export default Index;