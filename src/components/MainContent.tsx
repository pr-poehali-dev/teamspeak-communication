import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type NavItem = 'servers' | 'friends' | 'chats' | 'profile' | 'shop' | 'settings';

interface MainContentProps {
  activeNav: NavItem;
  micVolume: number[];
  setMicVolume: (volume: number[]) => void;
  soundVolume: number[];
  setSoundVolume: (volume: number[]) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isDeafened: boolean;
  setIsDeafened: (deafened: boolean) => void;
}

const MainContent = ({
  activeNav,
  micVolume,
  setMicVolume,
  soundVolume,
  setSoundVolume,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
}: MainContentProps) => {
  return (
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
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Mic" size={18} className="text-primary" />
                      Громкость микрофона
                    </Label>
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
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Volume2" size={18} className="text-green-500" />
                      Громкость звука
                    </Label>
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
    </div>
  );
};

export default MainContent;
