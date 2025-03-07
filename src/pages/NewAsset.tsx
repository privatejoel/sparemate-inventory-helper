
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Box, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewAssetPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const robotMakes = ['FANUC', 'ABB', 'KUKA', 'Yaskawa'];
  
  const [formData, setFormData] = useState({
    serialNumber: '',
    nameplate: '',
    stationName: '',
    lineName: '',
    robotNumber: '',
    robotMake: '',
    location: '',
    installDate: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would create a new asset
    toast({
      title: "Asset created",
      description: `Successfully added ${formData.serialNumber} to assets`,
    });
    
    navigate('/assets');
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/assets')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Asset</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Asset Details</CardTitle>
            <CardDescription>Fill in the details for the new asset.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Serial Number</label>
                  <Input 
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nameplate</label>
                  <Input 
                    name="nameplate"
                    value={formData.nameplate}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Station Name</label>
                  <Input 
                    name="stationName"
                    value={formData.stationName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Line Name</label>
                  <Input 
                    name="lineName"
                    value={formData.lineName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Robot Number</label>
                  <Input 
                    name="robotNumber"
                    value={formData.robotNumber}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Robot Make</label>
                  <select 
                    className="w-full rounded-md border p-2"
                    name="robotMake"
                    value={formData.robotMake}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select make...</option>
                    {robotMakes.map(make => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Installation Date</label>
                  <Input 
                    type="date"
                    name="installDate"
                    value={formData.installDate}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Status</label>
                <select 
                  className="w-full rounded-md border p-2"
                  name="status"
                  required
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="repair">Repair</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <textarea 
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Optional notes..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => navigate('/assets')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Create Asset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NewAssetPage;
