
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const NewSparePartPage = () => {
  const navigate = useNavigate();
  const robotMakes = ['FANUC', 'ABB', 'KUKA', 'Yaskawa'];
  const partTypes = ['cap-tip', 'tip-base', 'shank', 'adapter'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new spare part
    navigate('/spare-parts');
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/spare-parts')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Spare Parts
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Spare Part</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Spare Part Details</CardTitle>
            <CardDescription>Fill in the details for the new spare part.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Part Number</label>
                  <Input required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Part Type</label>
                  <select className="w-full rounded-md border p-2" required>
                    <option value="">Select type...</option>
                    {partTypes.map(type => (
                      <option key={type} value={type}>
                        {type.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Compatible Robots</label>
                  <select className="w-full rounded-md border p-2" multiple required>
                    {robotMakes.map(make => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Manufacturer</label>
                  <Input required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Supplier</label>
                  <Input required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Unit Price ($)</label>
                  <Input type="number" min="0" step="0.01" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Initial Stock Quantity</label>
                  <Input type="number" min="0" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Min Stock Level</label>
                  <Input type="number" min="0" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reorder Point</label>
                  <Input type="number" min="0" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reorder Quantity</label>
                  <Input type="number" min="0" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Lead Time (days)</label>
                  <Input type="number" min="0" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <textarea 
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  placeholder="Optional notes..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => navigate('/spare-parts')}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Spare Part
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NewSparePartPage;
