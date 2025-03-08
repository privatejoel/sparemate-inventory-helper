import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, ShoppingCart, Package, Truck, Calendar, FileText, CheckCircle, AlertCircle, XCircle, Edit, ClipboardList } from 'lucide-react';
import { mockReorders } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Reorder } from '@/lib/types';

const ReorderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [reorder, setReorder] = useState<Reorder | undefined>(
    mockReorders.find(r => r.id === id)
  );
  
  if (!reorder) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-6">
          <Button variant="ghost" onClick={() => navigate('/reorders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reorders
          </Button>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Reorder Not Found</h2>
                <p className="text-muted-foreground mb-6">The reorder you're looking for doesn't exist or has been deleted.</p>
                <Button onClick={() => navigate('/reorders')}>
                  View All Reorders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const handleApprove = () => {
    const updatedReorder = {
      ...reorder,
      status: 'approved' as const,
      dateApproved: new Date().toISOString().split('T')[0],
    };

    setReorder(updatedReorder);
    toast.success(`Reorder #${reorder.id.replace('ro-', '')} has been approved.`);
  };

  const handleReject = () => {
    const updatedReorder = {
      ...reorder,
      status: 'cancelled' as const,
    };

    setReorder(updatedReorder);
    toast.error(`Reorder #${reorder.id.replace('ro-', '')} has been rejected.`);
  };

  const handlePlaceOrder = () => {
    const updatedReorder = {
      ...reorder,
      status: 'ordered' as const,
      dateOrdered: new Date().toISOString().split('T')[0],
      expectedDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      purchaseOrderNumber: `PO-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setReorder(updatedReorder);
    toast.success(`Order #${reorder.id.replace('ro-', '')} has been placed.`);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'approved': return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case 'ordered': return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered': return <Package className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return "bg-amber-100 text-amber-800 border-amber-200";
      case 'approved': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'ordered': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'delivered': return "bg-green-100 text-green-800 border-green-200";
      case 'cancelled': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate('/reorders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reorders
          </Button>
          
          <div className="flex gap-2">
            {reorder.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleReject}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  variant="outline" 
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  onClick={handleApprove}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {reorder.status === 'approved' && (
              <Button onClick={handlePlaceOrder}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Place Order
              </Button>
            )}
            {reorder.status !== 'cancelled' && reorder.status !== 'delivered' && (
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Reorder #{id?.replace('ro-', '')}</h1>
          <Badge className={cn("text-sm py-1", getStatusColor(reorder.status))}>
            {getStatusIcon(reorder.status)}
            <span className="ml-1 capitalize">{reorder.status}</span>
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Reorder Details</CardTitle>
                <CardDescription>
                  Information about this spare part reorder
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Part Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Part Name</div>
                        <div className="font-medium">{reorder.partName}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Part Number</div>
                        <div className="font-medium">{reorder.partNumber}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Part Type</div>
                        <div className="font-medium capitalize">{reorder.partType.replace('-', ' ')}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Supplier</div>
                        <div className="font-medium">{reorder.supplier}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Order Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Quantity</div>
                        <div className="font-medium">{reorder.quantity}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Unit Price</div>
                        <div className="font-medium">${reorder.unitPrice.toFixed(2)}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                        <div className="font-medium">${reorder.totalPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  
                  {reorder.notes && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Notes</h3>
                        <div className="p-4 bg-muted rounded-lg">
                          <p>{reorder.notes}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  <li className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-background bg-blue-100">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </span>
                    <h3 className="font-semibold">Requested</h3>
                    <time className="block mb-2 text-sm text-muted-foreground">
                      {reorder.dateRequested ? new Date(reorder.dateRequested).toLocaleDateString() : "N/A"}
                    </time>
                  </li>
                  
                  {reorder.dateApproved && (
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-background bg-purple-100">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                      </span>
                      <h3 className="font-semibold">Approved</h3>
                      <time className="block mb-2 text-sm text-muted-foreground">
                        {new Date(reorder.dateApproved).toLocaleDateString()}
                      </time>
                    </li>
                  )}
                  
                  {reorder.dateOrdered && (
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-background bg-blue-100">
                        <ShoppingCart className="w-4 h-4 text-blue-600" />
                      </span>
                      <h3 className="font-semibold">Ordered</h3>
                      <time className="block mb-2 text-sm text-muted-foreground">
                        {new Date(reorder.dateOrdered).toLocaleDateString()}
                      </time>
                      {reorder.purchaseOrderNumber && (
                        <p className="text-sm text-muted-foreground">
                          PO: {reorder.purchaseOrderNumber}
                        </p>
                      )}
                    </li>
                  )}
                  
                  {reorder.expectedDelivery && (
                    <li className="mb-6 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-background bg-amber-100">
                        <Truck className="w-4 h-4 text-amber-600" />
                      </span>
                      <h3 className="font-semibold">Expected Delivery</h3>
                      <time className="block mb-2 text-sm text-muted-foreground">
                        {new Date(reorder.expectedDelivery).toLocaleDateString()}
                      </time>
                    </li>
                  )}
                  
                  {reorder.dateDelivered && (
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-background bg-green-100">
                        <Package className="w-4 h-4 text-green-600" />
                      </span>
                      <h3 className="font-semibold">Delivered</h3>
                      <time className="block mb-2 text-sm text-muted-foreground">
                        {new Date(reorder.dateDelivered).toLocaleDateString()}
                      </time>
                      {reorder.invoiceNumber && (
                        <p className="text-sm text-muted-foreground">
                          Invoice: {reorder.invoiceNumber}
                        </p>
                      )}
                    </li>
                  )}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReorderDetailsPage;
