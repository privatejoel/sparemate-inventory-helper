
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSpareParts } from '@/lib/mock-data';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewReorderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedPartId, setSelectedPartId] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState('');
  const [hasQuotedPrice, setHasQuotedPrice] = useState(false);
  const [quotedPrice, setQuotedPrice] = useState<number | null>(null);
  const [quoteValidity, setQuoteValidity] = useState<string>('');

  useEffect(() => {
    // Get partId from URL if it exists
    const params = new URLSearchParams(location.search);
    const partId = params.get('partId');
    if (partId) {
      setSelectedPartId(partId);
    }
  }, [location]);

  const selectedPart = mockSpareParts.find(part => part.id === selectedPartId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPartId) {
      toast({
        title: "Error",
        description: "Please select a part to reorder",
        variant: "destructive"
      });
      return;
    }

    if (!purchaseOrderNumber) {
      toast({
        title: "Error",
        description: "Please enter a Purchase Order Number",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would create a new reorder
    toast({
      title: "Reorder created",
      description: `Successfully created reorder for ${selectedPart?.name}`,
    });
    
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
                <select 
                  className="w-full rounded-md border p-2" 
                  value={selectedPartId}
                  onChange={(e) => setSelectedPartId(e.target.value)}
                  required
                >
                  <option value="">Select a part to reorder</option>
                  {mockSpareParts.map((part) => (
                    <option key={part.id} value={part.id}>
                      {part.name} ({part.partNumber}) - {part.stockQuantity} in stock
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedPart && (
                <div className="p-4 bg-muted rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Part Type:</div>
                    <div>{selectedPart.partType.replace('-', ' ')}</div>
                    
                    <div className="text-sm font-medium">Supplier:</div>
                    <div>{selectedPart.supplier}</div>
                    
                    <div className="text-sm font-medium">Unit Price:</div>
                    <div>₹{selectedPart.unitPrice.toFixed(2)}</div>
                    
                    <div className="text-sm font-medium">Lead Time:</div>
                    <div>{selectedPart.leadTime} days</div>
                    
                    <div className="text-sm font-medium">Total Cost:</div>
                    <div className="font-bold">₹{(selectedPart.unitPrice * quantity).toFixed(2)}</div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <Input 
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Purchase Order Number</label>
                <Input 
                  type="text" 
                  placeholder="Enter your PO number"
                  value={purchaseOrderNumber}
                  onChange={(e) => setPurchaseOrderNumber(e.target.value)}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quoted Price Information</label>
                <div className="flex items-center gap-2 mb-2">
                  <input 
                    type="checkbox" 
                    id="hasQuotedPrice"
                    checked={hasQuotedPrice}
                    onChange={(e) => setHasQuotedPrice(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="hasQuotedPrice" className="text-sm">
                    I have a previously quoted price
                  </label>
                </div>
                
                {hasQuotedPrice && (
                  <div className="space-y-3 p-3 border rounded-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quoted Price (₹)</label>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.01"
                        placeholder="Enter quoted price"
                        value={quotedPrice === null ? '' : quotedPrice}
                        onChange={(e) => setQuotedPrice(e.target.value ? parseFloat(e.target.value) : null)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quote Valid Until</label>
                      <Input 
                        type="date" 
                        value={quoteValidity}
                        onChange={(e) => setQuoteValidity(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency</label>
                <select 
                  className="w-full rounded-md border p-2"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="low">Low - Not urgent</option>
                  <option value="normal">Normal - Standard delivery</option>
                  <option value="high">High - Expedited shipping</option>
                  <option value="critical">Critical - Immediate need</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <textarea 
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  placeholder="Add any additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => navigate('/reorders')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <ShoppingCart className="mr-2 h-4 w-4" />
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
