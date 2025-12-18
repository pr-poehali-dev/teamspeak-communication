import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface Server {
  id: number;
  name: string;
  icon: string;
  online: number;
  total: number;
  channels: Channel[];
}

export interface Channel {
  id: number;
  name: string;
  type: 'voice' | 'text';
  users?: number;
  quality?: 'excellent' | 'good' | 'fair';
}

interface ServerSidebarProps {
  servers: Server[];
  selectedServer: Server;
  setSelectedServer: (server: Server) => void;
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  newServerName: string;
  setNewServerName: (name: string) => void;
  newServerIcon: string;
  setNewServerIcon: (icon: string) => void;
  newChannels: Array<{name: string, type: 'voice' | 'text'}>;
  setNewChannels: (channels: Array<{name: string, type: 'voice' | 'text'}>) => void;
  iconOptions: string[];
  addChannel: () => void;
  updateChannel: (index: number, field: 'name' | 'type', value: string) => void;
  removeChannel: (index: number) => void;
  createServer: () => void;
}

const ServerSidebar = ({
  servers,
  selectedServer,
  setSelectedServer,
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newServerName,
  setNewServerName,
  newServerIcon,
  setNewServerIcon,
  newChannels,
  iconOptions,
  addChannel,
  updateChannel,
  removeChannel,
  createServer,
}: ServerSidebarProps) => {
  return (
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
  );
};

export default ServerSidebar;
