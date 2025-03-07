
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockSpareParts } from '@/lib/mock-data';
import { ArrowLeft } from 'lucide-react';

const NewReorderPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new reorder
    navigate('/reorders');
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/reorders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reorders
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">New Reorder</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Reorder</CardTitle>
            <CardDescription>Fill in the details for the new spare part reorder.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Part</label>
                <select className="w-full rounded-md border p-2">
                  {mockSpareParts.map((part) => (
                    <option key={part.id} value={part.id}>
                      {part.name} ({part.partNumber})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <Input type="number" min="1" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <textarea 
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => navigate('/reorders')}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Reorder
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NewReorderPage;
