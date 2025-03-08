
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XCircle, Edit, Truck, HelpCircle } from 'lucide-react';

type SupportType = 'cancellation' | 'modification' | 'urgent-delivery' | 'other';

interface SupportRequestDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  orderId: string;
  onSubmit: (type: SupportType, notes: string) => void;
}

const SupportRequestDialog = ({
  isOpen,
  setIsOpen,
  orderId,
  onSubmit,
}: SupportRequestDialogProps) => {
  const [supportType, setSupportType] = useState<SupportType>('other');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmit(supportType, notes);
    setIsOpen(false);
    // Reset form
    setSupportType('other');
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Support</DialogTitle>
          <DialogDescription>
            Select the type of assistance you need for order #{orderId.replace('ro-', '')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={supportType}
            onValueChange={(value) => setSupportType(value as SupportType)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="cancellation" id="cancellation" />
              <Label htmlFor="cancellation" className="flex items-center gap-2 cursor-pointer">
                <XCircle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="font-medium">Order Cancellation</p>
                  <p className="text-sm text-muted-foreground">Cancel this order completely</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="modification" id="modification" />
              <Label htmlFor="modification" className="flex items-center gap-2 cursor-pointer">
                <Edit className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="font-medium">Order Modification</p>
                  <p className="text-sm text-muted-foreground">Change quantity, parts, or details</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="urgent-delivery" id="urgent-delivery" />
              <Label htmlFor="urgent-delivery" className="flex items-center gap-2 cursor-pointer">
                <Truck className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="font-medium">Urgent Delivery</p>
                  <p className="text-sm text-muted-foreground">Request expedited shipping</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="flex items-center gap-2 cursor-pointer">
                <HelpCircle className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="font-medium">Other Assistance</p>
                  <p className="text-sm text-muted-foreground">Any other support needed</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          
          <div className="mt-4">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please provide any additional details about your request..."
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupportRequestDialog;
