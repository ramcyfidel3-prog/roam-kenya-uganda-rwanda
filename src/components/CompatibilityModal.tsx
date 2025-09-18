import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Smartphone, Check, X, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Device {
  id: string;
  brand: string;
  model: string;
  os_type: string;
  is_supported: boolean;
  notes?: string;
}

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompatibilityModal = ({ isOpen, onClose }: CompatibilityModalProps) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('iOS');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchDevices();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = devices.filter(device => {
      const matchesOS = device.os_type === activeTab;
      const matchesSearch = searchTerm === '' || 
        device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesOS && matchesSearch;
    });
    setFilteredDevices(filtered);
  }, [devices, searchTerm, activeTab]);

  const fetchDevices = async () => {
    try {
      const { data, error } = await supabase
        .from('device_compatibility')
        .select('*')
        .order('brand')
        .order('model');

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error('Error fetching device compatibility:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedDevices = filteredDevices.reduce((acc, device) => {
    if (!acc[device.brand]) {
      acc[device.brand] = [];
    }
    acc[device.brand].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="bg-gradient-safari rounded-full w-10 h-10 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            Device Compatibility Check
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Section */}
          <div className="bg-card rounded-lg p-4 border border-border/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">eSIM Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  To use an AfriRoam eSIM, your device must support eSIM technology, 
                  must not be carrier-locked, and must not be jailbroken (iOS) or rooted (Android).
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for your device model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="iOS">iOS Devices</TabsTrigger>
              <TabsTrigger value="Android">Android Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="iOS" className="mt-4">
              <div className="max-h-96 overflow-y-auto space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading devices...</p>
                  </div>
                ) : (
                  Object.entries(groupedDevices).map(([brand, brandDevices]) => (
                    <div key={brand} className="space-y-2">
                      <h3 className="font-semibold text-lg">{brand}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {brandDevices.map((device) => (
                          <div 
                            key={device.id}
                            className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50"
                          >
                            <span className="text-sm">{device.model}</span>
                            {device.is_supported ? (
                              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <Check className="w-3 h-3 mr-1" />
                                Supported
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                <X className="w-3 h-3 mr-1" />
                                Not Supported
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="Android" className="mt-4">
              <div className="max-h-96 overflow-y-auto space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading devices...</p>
                  </div>
                ) : (
                  Object.entries(groupedDevices).map(([brand, brandDevices]) => (
                    <div key={brand} className="space-y-2">
                      <h3 className="font-semibold text-lg">{brand}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {brandDevices.map((device) => (
                          <div 
                            key={device.id}
                            className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50"
                          >
                            <span className="text-sm">{device.model}</span>
                            {device.is_supported ? (
                              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <Check className="w-3 h-3 mr-1" />
                                Supported
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                <X className="w-3 h-3 mr-1" />
                                Not Supported
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* No Results */}
          {!loading && filteredDevices.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Device Not Found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your device may not support eSIM or might not be in our database yet.
              </p>
              <p className="text-xs text-muted-foreground">
                Please check with your device manufacturer for eSIM compatibility.
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground text-center">
              Our device compatibility list is updated regularly, but it may not be exhaustive. 
              If you're unsure about your device's eSIM support, please check with your manufacturer 
              or contact our support team for assistance.
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompatibilityModal;